# Game Manager - Frontend

Steam-inspired game manager web application built with Angular 20.

## 🚀 Features

- **Authentication System**: Login and registration with JWT token management
- **Game Browsing**: Browse games with pagination and search
- **Game Details**: View detailed game information
- **Admin Panel**: Create, edit, and delete games (authenticated users only)
- **Responsive Design**: Steam-themed dark UI optimized for all devices
- **Real-time Validation**: Form validation with error messages
- **Image Preview**: Live preview of game cover images

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v20 or higher)
- Backend API running (see backend documentation)

## 🛠️ Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   Update `src/environments/environment.ts` with your API URL:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api'
   };
   ```

## 🏃 Running the Application

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

### Build for Production

```bash
npm run build
```

Build artifacts will be stored in the `dist/frontend` directory.

### Run Tests

```bash
npm test
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/          # UI Components
│   │   │   ├── navbar/          # Navigation bar
│   │   │   ├── login/           # Login form
│   │   │   ├── register/        # Registration form
│   │   │   ├── home/            # Games list (home page)
│   │   │   ├── game-details/    # Game details view
│   │   │   └── admin/
│   │   │       └── game-form/   # Create/Edit game form
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── user.model.ts    # User, Auth interfaces
│   │   │   └── game.model.ts    # Game, Category interfaces
│   │   ├── services/            # API services
│   │   │   ├── auth.service.ts  # Authentication logic
│   │   │   └── game.service.ts  # Game CRUD operations
│   │   ├── guards/              # Route guards
│   │   │   └── auth.guard.ts    # Authentication guard
│   │   ├── interceptors/        # HTTP interceptors
│   │   │   └── auth.interceptor.ts  # Token injection
│   │   ├── app.config.ts        # App configuration
│   │   └── app.routes.ts        # Route definitions
│   ├── environments/            # Environment configs
│   ├── styles.scss              # Global styles
│   └── index.html               # Main HTML file
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript config
```

## 🎨 Design System

### Color Palette (Steam-inspired)

- **Primary Background**: `#1b2838`
- **Secondary Background**: `#2a475e`
- **Primary Accent**: `#66c0f4`
- **Secondary Accent**: `#1b8cd8`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#b8b8b8`

### Components

All components use Angular 20 standalone components with:
- TypeScript strict mode
- SCSS for styling
- Reactive forms where applicable
- RxJS for state management

## 🔐 Authentication Flow

1. User logs in via `/login`
2. Backend returns JWT token
3. Token stored in localStorage
4. HTTP interceptor adds token to all requests
5. Auth guard protects admin routes
6. Navbar updates based on auth state

## 🛣️ Routes

| Route | Component | Auth Required | Description |
|-------|-----------|---------------|-------------|
| `/` | Home | No | Browse all games |
| `/login` | Login | No | User login |
| `/register` | Register | No | New user registration |
| `/game/:id` | GameDetails | No | View game details |
| `/admin/game/new` | GameForm | Yes | Create new game |
| `/admin/game/edit/:id` | GameForm | Yes | Edit existing game |

## 🔧 Services

### AuthService

- `login(credentials)`: Authenticate user
- `register(data)`: Register new user
- `logout()`: Clear session
- `isAuthenticated()`: Check auth status
- `currentUser$`: Observable of current user

### GameService

- `getGames(page)`: Fetch paginated games
- `getGame(id)`: Fetch single game
- `createGame(data)`: Create new game (auth required)
- `updateGame(id, data)`: Update game (auth required)
- `deleteGame(id)`: Delete game (auth required)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Development

1. Update `environment.ts` with dev API URL
2. Run `npm start`
3. Access at `http://localhost:4200`

### Production

1. Update `environment.prod.ts` with production API URL
2. Build: `npm run build`
3. Deploy `dist/frontend` folder to web server
4. Configure server to redirect all routes to `index.html` (SPA)

### Apache .htaccess (for SPA routing)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔍 API Integration

The frontend communicates with the Laravel backend API:

- **Base URL**: `http://localhost:8000/api` (development)
- **Authentication**: Bearer Token (stored in localStorage)
- **Content-Type**: `application/json`

All API requests automatically include the auth token via HTTP interceptor.

## 🎯 Key Features Implementation

### Token Management
- Auto token injection via HTTP interceptor
- Token stored in localStorage
- Auto logout on 401 responses

### Form Validation
- Real-time validation
- Custom error messages
- Disabled submit on invalid forms

### Loading States
- Spinner animations during API calls
- Disabled buttons during submission
- Loading overlays on data fetch

### Error Handling
- Display error messages from API
- Form validation errors
- Network error handling

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run e2e

# Code coverage
npm run test:coverage
```

## 📝 Notes

- All components are standalone (Angular 20 feature)
- Uses signals for reactive state management
- TypeScript strict mode enabled
- SCSS modules for component-scoped styling

## 🐛 Known Issues

- None currently

## 🔮 Future Enhancements

- [ ] Add game categories filter
- [ ] Implement search functionality
- [ ] Add user profile page
- [ ] Implement game ratings
- [ ] Add wishlist feature
- [ ] Support multiple languages

## 📄 License

This project is for educational purposes.

## 👥 Author

Adrian - Full Stack Developer

## 🤝 Contributing

1. Create feature branch
2. Commit changes
3. Push to branch
4. Open Pull Request
