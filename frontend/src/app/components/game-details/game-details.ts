import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-details',
  imports: [CommonModule],
  templateUrl: './game-details.html',
  styleUrl: './game-details.scss',
  standalone: true
})
export class GameDetails implements OnInit {
  game: Game | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadGame(+id);
    }
  }

  loadGame(id: number): void {
    this.isLoading = true;
    this.gameService.getGame(id).subscribe({
      next: (response) => {
        this.game = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading game:', error);
        this.errorMessage = 'Game not found';
        this.isLoading = false;
      }
    });
  }

  editGame(): void {
    if (this.game) {
      this.router.navigate(['/admin/game/edit', this.game.id]);
    }
  }

  deleteGame(): void {
    if (!this.game) return;
    
    if (!confirm(`Are you sure you want to delete "${this.game.title}"?`)) {
      return;
    }

    this.gameService.deleteGame(this.game.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error deleting game:', error);
        alert('Failed to delete game. Please try again.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
