import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-modal.html',
  styleUrl: './payment-modal.scss',
  standalone: true
})
export class PaymentModal {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() paymentComplete = new EventEmitter<number>();

  amount: number = 10;
  cardType: string = 'visa';
  cardNumber: string = '';
  cardHolder: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  cvv: string = '';
  isProcessing: boolean = false;
  errorMessage: string = '';

  cardTypes = [
    { value: 'visa', label: 'Visa', icon: '💳' },
    { value: 'mastercard', label: 'Mastercard', icon: '💳' },
    { value: 'amex', label: 'American Express', icon: '💳' },
    { value: 'discover', label: 'Discover', icon: '💳' }
  ];

  amounts = [10, 25, 50, 100, 250, 500];

  months = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ];

  years: string[] = [];

  constructor() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push((currentYear + i).toString());
    }
  }

  onClose(): void {
    if (!this.isProcessing) {
      this.close.emit();
      this.resetForm();
    }
  }

  selectAmount(amount: number): void {
    this.amount = amount;
  }

  formatCardNumber(): void {
    // Remove all non-digits
    let value = this.cardNumber.replace(/\D/g, '');
    
    // Limit to 16 digits
    value = value.substring(0, 16);
    
    // Add spaces every 4 digits
    const parts = value.match(/.{1,4}/g);
    this.cardNumber = parts ? parts.join(' ') : value;
  }

  formatCVV(): void {
    this.cvv = this.cvv.replace(/\D/g, '').substring(0, 4);
  }

  isFormValid(): boolean {
    return (
      this.amount > 0 &&
      this.cardNumber.replace(/\s/g, '').length === 16 &&
      this.cardHolder.trim().length > 0 &&
      this.expiryMonth !== '' &&
      this.expiryYear !== '' &&
      this.cvv.length >= 3
    );
  }

  processPayment(): void {
    if (!this.isFormValid()) {
      this.errorMessage = 'Kérlek töltsd ki az összes mezőt helyesen!';
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';

    // Simulate payment processing
    setTimeout(() => {
      this.isProcessing = false;
      this.paymentComplete.emit(this.amount);
      this.resetForm();
    }, 2000);
  }

  resetForm(): void {
    this.amount = 10;
    this.cardType = 'visa';
    this.cardNumber = '';
    this.cardHolder = '';
    this.expiryMonth = '';
    this.expiryYear = '';
    this.cvv = '';
    this.errorMessage = '';
  }
}
