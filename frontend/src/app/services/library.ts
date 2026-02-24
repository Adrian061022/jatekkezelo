import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class Library {
  private apiUrl = `${environment.apiUrl}/library`;

  constructor(private http: HttpClient) {}

  /**
   * Get user's game library
   */
  getLibrary(): Observable<{ data: Game[] }> {
    return this.http.get<{ data: Game[] }>(this.apiUrl);
  }

  /**
   * Purchase a game (add to library)
   */
  purchaseGame(gameId: number): Observable<{ message: string; data: Game }> {
    return this.http.post<{ message: string; data: Game }>(
      `${this.apiUrl}/purchase/${gameId}`,
      {}
    );
  }

  /**
   * Check if user owns a game
   */
  checkOwnership(gameId: number): Observable<{ owns: boolean }> {
    return this.http.get<{ owns: boolean }>(
      `${this.apiUrl}/check/${gameId}`
    );
  }

  /**
   * Add funds to user balance
   */
  addFunds(amount: number): Observable<{ message: string; new_balance: number }> {
    return this.http.post<{ message: string; new_balance: number }>(
      `${this.apiUrl}/add-funds`,
      { amount }
    );
  }
}
