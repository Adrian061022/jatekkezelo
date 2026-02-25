import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game, GameRequest, PaginatedGames } from '../models/game.model';

export interface GameFilters {
  search?: string;
  category_id?: number;
  sort_by?: 'created_at' | 'price' | 'title';
  sort_order?: 'asc' | 'desc';
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = `${environment.apiUrl}/games`;
  private categoriesUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getGames(page: number = 1, filters?: GameFilters): Observable<PaginatedGames> {
    let params = new HttpParams().set('page', page.toString());
    
    if (filters) {
      if (filters.search) {
        params = params.set('search', filters.search);
      }
      if (filters.category_id) {
        params = params.set('category_id', filters.category_id.toString());
      }
      if (filters.sort_by) {
        params = params.set('sort_by', filters.sort_by);
      }
      if (filters.sort_order) {
        params = params.set('sort_order', filters.sort_order);
      }
    }
    
    return this.http.get<PaginatedGames>(this.apiUrl, { params });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getGame(id: number): Observable<{ data: Game }> {
    return this.http.get<{ data: Game }>(`${this.apiUrl}/${id}`);
  }

  createGame(game: GameRequest): Observable<{ data: Game }> {
    return this.http.post<{ data: Game }>(this.apiUrl, game);
  }

  updateGame(id: number, game: GameRequest): Observable<{ data: Game }> {
    return this.http.put<{ data: Game }>(`${this.apiUrl}/${id}`, game);
  }

  deleteGame(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
