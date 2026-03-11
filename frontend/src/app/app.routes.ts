import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { GameDetails } from './components/game-details/game-details';
import { GameForm } from './components/admin/game-form/game-form';
import { LibraryComponent } from './components/library/library';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home - Game Manager'
  },
  {
    path: 'login',
    component: Login,
    title: 'Login - Game Manager'
  },
  {
    path: 'register',
    component: Register,
    title: 'Register - Game Manager'
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [authGuard],
    title: 'My Library - Game Manager'
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
    title: 'Profil - Game Manager'
  },
  {
    path: 'user/:id',
    component: Profile,
    title: 'Felhasználó profilja - Game Manager'
  },
  {
    path: 'game/:id',
    component: GameDetails,
    title: 'Game Details - Game Manager'
  },
  {
    path: 'admin/game/new',
    component: GameForm,
    canActivate: [authGuard],
    title: 'Add New Game - Game Manager'
  },
  {
    path: 'admin/game/edit/:id',
    component: GameForm,
    canActivate: [authGuard],
    title: 'Edit Game - Game Manager'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
