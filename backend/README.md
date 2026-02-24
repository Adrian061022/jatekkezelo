# 🎮 Steam-szerű Játékkezelő - Backend API

Laravel alapú REST API a játékkezelő alkalmazáshoz.

## 📋 Követelmények

- PHP 8.2+
- MySQL 5.7+ / MariaDB 10.3+
- Composer 2.x
- Node.js 18+ & NPM (asset build-hez)

## 🚀 Telepítés (Lokális fejlesztéshez)

### 1. Repository klónozása

```bash
git clone <repository-url>
cd backend
```

### 2. Függőségek telepítése

```bash
composer install
npm install
```

### 3. Environment konfiguráció

```bash
cp .env.example .env
```

Szerkeszd a `.env` fájlt:

```env
APP_NAME="Steam-like Game Manager"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jatekkezelo_db
DB_USERNAME=root
DB_PASSWORD=

# Frontend URL (Angular)
FRONTEND_URL=http://localhost:4200

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:4200,127.0.0.1,127.0.0.1:4200
```

### 4. Kulcs generálás

```bash
php artisan key:generate
```

### 5. Adatbázis létrehozása

Hozd létre az adatbázist MySQL-ben:

```sql
CREATE DATABASE jatekkezelo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Migrációk és seeder futtatása

```bash
php artisan migrate:fresh --seed
```

Ez létrehoz:
- 5 kategóriát
- 10 játékot
- 1 admin usert (email: admin@example.com, password: password)

### 7. Szerver indítása

```bash
php artisan serve
```

API elérhető: `http://localhost:8000`

## 📡 API Endpointok

### Publikus endpointok

| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| GET | `/api/test` | API működés teszt |
| GET | `/api/games` | Játékok listája (paginated) |
| GET | `/api/games/{id}` | Egy játék részletei |
| POST | `/api/register` | Regisztráció |
| POST | `/api/login` | Bejelentkezés |

### Védett endpointok (Bearer Token szükséges)

| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| GET | `/api/user` | Bejelentkezett user adatai |
| POST | `/api/logout` | Kijelentkezés |
| POST | `/api/games` | Új játék létrehozása |
| PUT | `/api/games/{id}` | Játék módosítása |
| DELETE | `/api/games/{id}` | Játék törlése |

### Request példák

**Login:**
```bash
POST /api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
```

**Válasz:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com"
  },
  "access_token": "1|abc123...",
  "token_type": "Bearer"
}
```

**Játékok lekérése:**
```bash
GET /api/games
```

**Új játék létrehozása (auth szükséges):**
```bash
POST /api/games
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Új játék",
  "description": "Leírás",
  "price": 29.99,
  "cover_image": "https://example.com/image.jpg",
  "category_id": 1
}
```

## 🗄️ Adatbázis struktúra

### Users
- id
- name
- email
- password
- timestamps

### Categories
- id
- name
- slug
- timestamps

### Games
- id
- title
- description
- price (decimal)
- cover_image (string, nullable)
- category_id (foreign)
- timestamps

## 🚀 Production Deploy (FTP)

### 1. Build assets

```bash
npm run build
```

### 2. Konfiguráció

Készíts egy `.env` fájlt a szerveren a `.env.production` alapján:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=your_production_db
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

FRONTEND_URL=https://yourdomain.com
```

### 3. Fájlok feltöltése FTP-n

Töltsd fel ezeket a mappákat/fájlokat:
- `/app`
- `/bootstrap`
- `/config`
- `/database`
- `/public`
- `/resources`
- `/routes`
- `/storage` (chmod 775)
- `/vendor` (vagy futtass `composer install --optimize-autoloader --no-dev` a szerveren)
- `.env` (szerver specifikus!)
- `artisan`
- `composer.json`
- `composer.lock`

### 4. Szerver parancsok (SSH-n keresztül)

```bash
# Composer telepítése
composer install --optimize-autoloader --no-dev

# Kulcs generálás (ha még nincs)
php artisan key:generate

# Cache tisztítás
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migrációk
php artisan migrate --force

# Storage link
php artisan storage:link
```

### 5. .htaccess beállítás

A public mappában lévő `.htaccess` fájl már tartalmazza a szükséges beállításokat.

**Fontos:** A domain-nek a `/public` mappára kell mutatnia!

## 🔒 Biztonsági checklist production-höz

- [ ] `APP_DEBUG=false`
- [ ] `APP_ENV=production`
- [ ] Erős `APP_KEY` generálva
- [ ] Adatbázis jelszó biztonságos
- [ ] `/storage` mappa írható (chmod 775)
- [ ] HTTPS beállítva
- [ ] CORS csak specifikus domain-ekre
- [ ] Rate limiting beállítva (alapból van)

## 🧪 Tesztelés

```bash
# API teszt
curl http://localhost:8000/api/test

# Játékok lista
curl http://localhost:8000/api/games

# Login teszt
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

## 📚 Technológiák

- Laravel 12.x
- Laravel Sanctum (API Authentication)
- MySQL/MariaDB
- PHP 8.2+

## 👨‍💻 Fejlesztés

```bash
# Development szerver
php artisan serve

# Cache tisztítás
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Új migráció
php artisan make:migration create_table_name

# Új model
php artisan make:model ModelName -mf

# Új controller
php artisan make:controller Api/ControllerName --api
```

## 📝 License

MIT
