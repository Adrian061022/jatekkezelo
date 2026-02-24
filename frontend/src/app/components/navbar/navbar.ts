import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Library } from '../../services/library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar {
  constructor(
    public authService: AuthService,
    private libraryService: Library,
    private router: Router
  ) {}

  get isAdmin(): boolean {
    return this.authService.currentUserValue?.role === 'admin';
  }

  openAddFundsModal(): void {
    const amount = prompt('Enter amount to add (e.g., 100):');
    if (amount && !isNaN(+amount) && +amount > 0) {
      this.libraryService.addFunds(+amount).subscribe({
        next: (response) => {
          alert(response.message);
          // Update user balance in auth service
          const currentUser = this.authService.currentUserValue;
          if (currentUser) {
            currentUser.balance = response.new_balance;
            this.authService.updateCurrentUser(currentUser);
          }
        },
        error: (error) => {
          console.error('Error adding funds:', error);
          alert('Failed to add funds. Please try again.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Even if API call fails, clear local data
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }
    });
  }
}
