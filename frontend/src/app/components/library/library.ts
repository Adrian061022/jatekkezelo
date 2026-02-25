import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Library as LibraryService } from '../../services/library';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-library',
  imports: [CommonModule],
  templateUrl: './library.html',
  styleUrl: './library.scss',
  standalone: true
})
export class LibraryComponent implements OnInit {
  games: Game[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private libraryService: LibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLibrary();
  }

  loadLibrary(): void {
    this.isLoading = true;
    this.libraryService.getLibrary().subscribe({
      next: (response) => {
        this.games = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading library:', error);
        this.errorMessage = 'Failed to load your library';
        this.isLoading = false;
      }
    });
  }

  viewGame(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }
}
