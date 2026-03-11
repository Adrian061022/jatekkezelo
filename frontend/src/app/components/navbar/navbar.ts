import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Library } from '../../services/library';
import { Router } from '@angular/router';
import { PaymentModal } from '../payment-modal/payment-modal';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, PaymentModal],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar {
  isPaymentModalOpen: boolean = false;

  constructor(
    public authService: AuthService,
    private libraryService: Library,
    private router: Router
  ) {}

  get isAdmin(): boolean {
    return this.authService.currentUserValue?.role === 'admin';
  }

  openAddFundsModal(): void {
    this.isPaymentModalOpen = true;
  }

  closePaymentModal(): void {
    this.isPaymentModalOpen = false;
  }

  onPaymentComplete(amount: number): void {
    this.libraryService.addFunds(amount).subscribe({
      next: (response) => {
        // Update user balance in auth service
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
          currentUser.balance = response.new_balance;
          this.authService.updateCurrentUser(currentUser);
        }
        this.isPaymentModalOpen = false;
        alert(`✅ Sikeres fizetés! $${amount} hozzáadva az egyenlegedhez.`);
      },
      error: (error) => {
        console.error('Error adding funds:', error);
        alert('❌ Hiba történt a fizetés során. Kérlek próbáld újra.');
      }
    });
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
