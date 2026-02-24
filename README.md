# Steam-szerű Játékkezelő Webalkalmazás

Modern játékkezelő alkalmazás Laravel backend és Angular frontend-del.

## 📁 Projekt struktúra

```
jatekkezelo/
├── backend/          # Laravel 12 REST API
└── frontend/         # Angular alkalmazás (később)
```

## 🚀 Gyors start

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

Részletes dokumentáció: [backend/README.md](backend/README.md)

### Frontend (Coming soon)

```bash
cd frontend
npm install
ng serve
```

## 📚 Dokumentáció

- [Backend README](backend/README.md)
- [API Dokumentáció](backend/API_DOCUMENTATION.md)

## 🎯 Funkciók

### MVP (Minimum Viable Product)

✅ **Backend (Laravel)**
- REST API
- Sanctum autentikáció
- Game CRUD műveletek
- Category rendszer
- API Resources
- Form Request validáció
- Factory & Seeder

⏳ **Frontend (Angular)** - Coming soon
- Game lista
- Game részletek
- Login/Register
- Admin interface
- Token kezelés
- Dark theme (Steam-like)

## 🛠 Technológiák

### Backend
- PHP 8.2+
- Laravel 12.x
- MySQL/MariaDB
- Laravel Sanctum
- RESTful API

### Frontend (Tervezett)
- Angular (latest)
- TypeScript
- RxJS
- Angular Material/Bootstrap
- HttpClient

## 📦 Branch struktúra

- `main` - Production ready kód
- `backend` - Backend fejlesztés
- `frontend` - Frontend fejlesztés
- `develop` - Development branch

## 🚀 Deploy

### FTP feltöltés

1. Backend build:
```bash
cd backend
composer install --optimize-autoloader --no-dev
npm run build
```

2. Fájlok feltöltése FTP-n (lásd: backend/README.md)

3. Szerver beállítások
```bash
php artisan config:cache
php artisan route:cache
php artisan migrate --force
```

## 📝 API Végpontok

```
GET    /api/test              - API teszt
GET    /api/games             - Játékok listája
GET    /api/games/{id}        - Játék részletei
POST   /api/register          - Regisztráció
POST   /api/login             - Bejelentkezés

Protected (auth:sanctum):
POST   /api/logout            - Kijelentkezés
GET    /api/user              - User adatok
POST   /api/games             - Új játék
PUT    /api/games/{id}        - Játék szerkesztése
DELETE /api/games/{id}        - Játék törlése
```

Részletes API dokumentáció: [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

## 👨‍💻 Fejlesztés

### Backend szerver indítása
```bash
cd backend
php artisan serve
```

### Tesztelés
```bash
# API teszt
curl http://localhost:8000/api/test

# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

## 🔐 Default login adatok

```
Email: admin@example.com
Password: password
```

## 📄 Licenc

MIT

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Kapcsolat

Project Link: [https://github.com/yourusername/jatekkezelo](https://github.com/yourusername/jatekkezelo)
