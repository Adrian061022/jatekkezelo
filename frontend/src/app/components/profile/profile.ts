import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User, ProfileUpdateRequest } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  standalone: true
})
export class Profile implements OnInit {
  user: User | null = null;
  isEditing: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isOwnProfile: boolean = true;
  viewedUserId: number | null = null;
  
  profileData: ProfileUpdateRequest = {
    name: '',
    profile_picture: '',
    bio: ''
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        // Viewing another user's profile
        this.viewedUserId = +params['id'];
        this.isOwnProfile = false;
        this.loadUserProfile(this.viewedUserId);
      } else {
        // Viewing own profile
        this.isOwnProfile = true;
        this.user = this.authService.currentUserValue;
        if (this.user) {
          this.profileData = {
            name: this.user.name,
            profile_picture: this.user.profile_picture || '',
            bio: this.user.bio || ''
          };
        } else {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  loadUserProfile(userId: number): void {
    this.isLoading = true;
    this.http.get<{ user: User }>(`${environment.apiUrl}/users/${userId}`)
      .subscribe({
        next: (response) => {
          this.user = response.user;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Nem sikerült betölteni a felhasználó profilját.';
          this.isLoading = false;
          console.error('Error loading user profile:', error);
        }
      });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.errorMessage = '';
    this.successMessage = '';
    
    // Reset form if cancelling
    if (!this.isEditing && this.user) {
      this.profileData = {
        name: this.user.name,
        profile_picture: this.user.profile_picture || '',
        bio: this.user.bio || ''
      };
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.updateProfile(this.profileData).subscribe({
      next: (response) => {
        this.user = response.user;
        this.authService.updateCurrentUser(response.user);
        this.successMessage = 'Profil sikeresen frissítve!';
        this.isEditing = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = error.error?.message || 'Hiba történt a profil frissítése során';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
