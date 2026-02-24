import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService, GameFilters, Category } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Game, PaginatedGames } from '../../models/game.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home implements OnInit {
  games: Game[] = [];
  categories: Category[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  currentPage: number = 1;
  lastPage: number = 1;
  total: number = 0;

  // Filters
  searchQuery: string = '';
  selectedCategoryId: number | undefined = undefined;
  sortBy: 'created_at' | 'price' | 'title' = 'created_at';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(
    private gameService: GameService,
    public authService: AuthService,
    private router: Router
  ) {}

  get isAdmin(): boolean {
    return this.authService.currentUserValue?.role === 'admin';
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadGames();
  }

  loadCategories(): void {
    this.gameService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadGames(page: number = 1): void {
    this.isLoading = true;
    this.errorMessage = '';

    const filters: GameFilters = {
      search: this.searchQuery || undefined,
      category_id: this.selectedCategoryId,
      sort_by: this.sortBy,
      sort_order: this.sortOrder
    };

    this.gameService.getGames(page, filters).subscribe({
      next: (response: PaginatedGames) => {
        this.games = response.data;
        this.currentPage = response.meta.current_page;
        this.lastPage = response.meta.last_page;
        this.total = response.meta.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading games:', error);
        this.errorMessage = 'Failed to load games. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadGames(1);
  }

  onCategoryChange(): void {
    this.currentPage = 1;
    this.loadGames(1);
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.loadGames(1);
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategoryId = undefined;
    this.sortBy = 'created_at';
    this.sortOrder = 'desc';
    this.currentPage = 1;
    this.loadGames(1);
  }

  viewGame(id: number): void {
    this.router.navigate(['/game', id]);
  }

  deleteGame(id: number, title: string): void {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    this.gameService.deleteGame(id).subscribe({
      next: () => {
        this.loadGames(this.currentPage);
      },
      error: (error) => {
        console.error('Error deleting game:', error);
        alert('Failed to delete game. Please try again.');
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.loadGames(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadGames(this.currentPage - 1);
    }
  }
}
