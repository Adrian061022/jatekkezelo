import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Library } from '../../services/library';
import { ReviewService } from '../../services/review.service';
import { Game } from '../../models/game.model';
import { Review, ReviewRequest } from '../../models/review.model';

@Component({
  selector: 'app-game-details',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './game-details.html',
  styleUrl: './game-details.scss',
  standalone: true
})
export class GameDetails implements OnInit {
  game: Game | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  ownsGame: boolean = false;
  checkingOwnership: boolean = false;
  
  // Reviews
  reviews: Review[] = [];
  averageRating: number = 0;
  totalReviews: number = 0;
  loadingReviews: boolean = false;
  userReview: Review | null = null;
  isEditingReview: boolean = false;
  reviewData: ReviewRequest = {
    rating: 5,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private libraryService: Library,
    private reviewService: ReviewService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadGame(+id);
      this.loadReviews(+id);
    }
  }

  loadGame(id: number): void {
    this.isLoading = true;
    this.gameService.getGame(id).subscribe({
      next: (response) => {
        this.game = response.data;
        this.isLoading = false;
        this.checkOwnership(id);
      },
      error: (error) => {
        console.error('Error loading game:', error);
        this.errorMessage = 'Game not found';
        this.isLoading = false;
      }
    });
  }

  loadReviews(gameId: number): void {
    this.loadingReviews = true;
    this.reviewService.getReviews(gameId).subscribe({
      next: (response) => {
        this.reviews = response.data;
        this.averageRating = response.meta.average_rating;
        this.totalReviews = response.meta.total_reviews;
        
        // Find user's review if exists
        if (this.authService.isLoggedIn) {
          const userId = this.authService.currentUserValue?.id;
          this.userReview = this.reviews.find(r => r.user_id === userId) || null;
          
          if (this.userReview) {
            this.reviewData = {
              rating: this.userReview.rating,
              comment: this.userReview.comment || ''
            };
          }
        }
        
        this.loadingReviews = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.loadingReviews = false;
      }
    });
  }

  checkOwnership(id: number): void {
    if (!this.authService.isLoggedIn) return;
    
    this.checkingOwnership = true;
    this.libraryService.checkOwnership(id).subscribe({
      next: (response) => {
        this.ownsGame = response.owns;
        this.checkingOwnership = false;
      },
      error: () => {
        this.checkingOwnership = false;
      }
    });
  }

  get isAdmin(): boolean {
    return this.authService.currentUserValue?.role === 'admin';
  }

  purchaseGame(): void {
    if (!this.game) return;

    this.libraryService.purchaseGame(this.game.id).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        this.ownsGame = true;
        
        // Update user balance
        const currentUser = this.authService.currentUserValue;
        if (currentUser && response.new_balance !== undefined) {
          currentUser.balance = response.new_balance;
          this.authService.updateCurrentUser(currentUser);
        }
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to purchase game';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
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

  // Review Methods
  setRating(rating: number): void {
    this.reviewData.rating = rating;
  }

  submitReview(): void {
    if (!this.game) return;

    if (this.userReview) {
      // Update existing review
      this.reviewService.updateReview(this.game.id, this.userReview.id, this.reviewData).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.loadReviews(this.game!.id);
          this.isEditingReview = false;
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Hiba az értékelés frissítése során';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
    } else {
      // Create new review
      this.reviewService.createReview(this.game.id, this.reviewData).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.loadReviews(this.game!.id);
          this.reviewData = { rating: 5, comment: '' };
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Hiba az értékelés létrehozása során';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
    }
  }

  cancelEditReview(): void {
    if (this.userReview) {
      this.reviewData = {
        rating: this.userReview.rating,
        comment: this.userReview.comment || ''
      };
    }
    this.isEditingReview = false;
  }

  deleteReview(reviewId: number): void {
    if (!this.game) return;
    
    if (!confirm('Biztosan törölni szeretnéd ezt az értékelést?')) {
      return;
    }

    this.reviewService.deleteReview(this.game.id, reviewId).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.loadReviews(this.game!.id);
        this.reviewData = { rating: 5, comment: '' };
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Hiba az értékelés törlése során';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  getStars(rating: number): boolean[] {
    // Return array of 5 booleans, true for filled stars, false for empty
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  getRoundedRating(): number {
    return Math.round(this.averageRating);
  }

  canEditReview(review: Review): boolean {
    if (!this.authService.isLoggedIn) return false;
    const userId = this.authService.currentUserValue?.id;
    return review.user_id === userId || this.isAdmin;
  }
}
