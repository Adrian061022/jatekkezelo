import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Review, ReviewRequest, ReviewsResponse } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) { }

  getReviews(gameId: number): Observable<ReviewsResponse> {
    return this.http.get<ReviewsResponse>(`${this.apiUrl}/${gameId}/reviews`);
  }

  createReview(gameId: number, review: ReviewRequest): Observable<{ message: string; data: Review }> {
    return this.http.post<{ message: string; data: Review }>(`${this.apiUrl}/${gameId}/reviews`, review);
  }

  updateReview(gameId: number, reviewId: number, review: ReviewRequest): Observable<{ message: string; data: Review }> {
    return this.http.put<{ message: string; data: Review }>(`${this.apiUrl}/${gameId}/reviews/${reviewId}`, review);
  }

  deleteReview(gameId: number, reviewId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${gameId}/reviews/${reviewId}`);
  }
}
