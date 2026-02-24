# 🎮 Game Manager - Steam-inspired Web Application

Modern full-stack game management application with Steam-inspired UI design.

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat-square&logo=laravel)
![Angular](https://img.shields.io/badge/Angular-20.x-DD0031?style=flat-square&logo=angular)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat-square&logo=php)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)

## 📋 Overview

A production-ready web application for managing video game libraries with features inspired by the Steam platform. Built with Laravel 12 REST API backend and Angular 20 standalone components frontend.

## ✨ Key Features

- 🔐 **JWT Authentication** - Secure login/register with Laravel Sanctum
- 🎮 **Game Management** - Full CRUD operations for game library
- 📱 **Responsive Design** - Steam-themed dark UI optimized for all devices
- 🔍 **Game Browsing** - Paginated game list with detailed views
- 👤 **Admin Panel** - Protected routes for game creation and editing
- 🖼️ **Image Preview** - Real-time cover image preview
- ✅ **Form Validation** - Client and server-side validation
- 🎨 **Modern UI/UX** - Steam-inspired gradient designs and animations

## 📁 Project Structure

```
jatekkezelo/
├── backend/                 # Laravel 12 REST API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/   # API Controllers
│   │   │   ├── Resources/         # API Resources
│   │   │   └── Requests/          # Form Requests
│   │   └── Models/                # Eloquent Models
│   ├── database/
│   │   ├── migrations/            # Database schema
│   │   ├── factories/             # Model factories
│   │   └── seeders/               # Database seeders
│   ├── routes/api.php             # API routes
│   └── README.md                  # Backend documentation
│
└── frontend/                # Angular 20 Application
    ├── src/
    │   ├── app/
    │   │   ├── components/        # UI Components
    │   │   ├── services/          # API Services
    │   │   ├── models/            # TypeScript Interfaces
    │   │   ├── guards/            # Route Guards
    │   │   ├── interceptors/      # HTTP Interceptors
    │   │   └── app.routes.ts      # Route Configuration
    │   ├── environments/          # Environment configs
    │   └── styles.scss            # Global styles
    └── README.md                  # Frontend documentation
```

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 12.x
- **Language**: PHP 8.2+
- **Database**: MySQL 8.0+
- **Authentication**: Laravel Sanctum (API Tokens)
- **API**: RESTful with JSON responses
- **Testing**: PHPUnit, Pest

### Frontend
- **Framework**: Angular 20.2.1
- **Language**: TypeScript 5.x
- **State Management**: RxJS + Signals
- **Styling**: SCSS with Steam theme
- **HTTP Client**: HttpClient with interceptors
- **Routing**: Angular Router with guards

## 🚀 Quick Start

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL 8.0+
- Git

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
composer install

# Configure environment
cp .env.example .env

# Generate app key
php artisan key:generate

# Create database
# Create 'jatekkezelo_db' in MySQL

# Run migrations and seeders
php artisan migrate:fresh --seed

# Start development server
php artisan serve
```

Backend will run at: `http://localhost:8000`

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `password`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will run at: `http://localhost:4200`

## 📖 Documentation

- **[Backend Documentation](backend/README.md)** - Laravel API setup and usage
- **[Frontend Documentation](frontend/README.md)** - Angular app setup and architecture
- **[API Documentation](backend/API_DOCUMENTATION.md)** - Complete API endpoint reference

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout (auth required)
- `GET /api/user` - Get current user (auth required)

### Games
- `GET /api/games` - List all games (paginated)
- `GET /api/games/{id}` - Get single game
- `POST /api/games` - Create game (auth required)
- `PUT /api/games/{id}` - Update game (auth required)
- `DELETE /api/games/{id}` - Delete game (auth required)

## 🎨 Design System

The application uses a Steam-inspired dark theme:

### Color Palette
- **Primary Background**: `#1b2838`
- **Secondary Background**: `#2a475e`
- **Primary Accent**: `#66c0f4` (Steam Blue)
- **Secondary Accent**: `#1b8cd8`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#b8b8b8`

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Headings**: 300 font-weight with gradient text
- **Body**: 400 font-weight

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Backend (Laravel)

1. Update `.env` for production
2. Run migrations: `php artisan migrate --force`
3. Cache config: `php artisan config:cache`
4. Cache routes: `php artisan route:cache`
5. Optimize: `php artisan optimize`

### Frontend (Angular)

1. Update `environment.prod.ts`
2. Build: `npm run build`
3. Deploy `dist/frontend` to web server
4. Configure `.htaccess` for SPA routing

### Server Requirements
- PHP 8.2+
- MySQL 8.0+
- Composer
- Apache/Nginx
- Node.js (for build)

## 🔐 Security Features

- ✅ CSRF Protection
- ✅ SQL Injection Prevention (Eloquent ORM)
- ✅ XSS Protection
- ✅ JWT Token Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Rate Limiting
- ✅ CORS Configuration
- ✅ Input Validation (Client & Server)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Git Workflow

This project uses a branch-based workflow:

- **backend** - Laravel API development
- **frontend** - Angular app development
- **main** - Production-ready merged code

## 📝 Database Schema

### Users Table
- id, name, email, password, timestamps

### Categories Table
- id, name, slug, timestamps

### Games Table
- id, title, description, price, cover_image, category_id, timestamps

### Relationships
- Category `hasMany` Games
- Game `belongsTo` Category

## 🌟 Features by Role

### Public Users
- ✅ View game library
- ✅ View game details
- ✅ Register account
- ✅ Login

### Authenticated Users (Admin)
- ✅ All public features
- ✅ Create new games
- ✅ Edit existing games
- ✅ Delete games

## 🚧 Future Enhancements

- [ ] User roles and permissions
- [ ] Game categories filtering
- [ ] Advanced search functionality
- [ ] User wishlists
- [ ] Game ratings and reviews
- [ ] User profiles
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

**Adrian**  
Full Stack Developer

- GitHub: [@Adrian061022](https://github.com/Adrian061022)

## 🙏 Acknowledgments

- Laravel Framework
- Angular Framework
- Steam (UI/UX inspiration)
- Open source community

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ using Laravel & Angular**
