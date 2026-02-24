# 📡 API Dokumentáció

## Base URL

- **Lokális:** `http://localhost:8000/api`
- **Production:** `https://yourdomain.com/api`

## Autentikáció

Az API Laravel Sanctum tokent használ. A védett endpoint-okhoz a következő header szükséges:

```
Authorization: Bearer {your_token}
```

A tokent a `/api/login` vagy `/api/register` endpoint visszaadja.

---

## 🔓 Publikus Endpointok

### 1. API Teszt

**Endpoint:** `GET /api/test`

**Leírás:** Ellenőrzi, hogy az API működik-e.

**Válasz:**
```json
{
  "message": "API működik"
}
```

---

### 2. Játékok listája

**Endpoint:** `GET /api/games`

**Leírás:** Visszaadja az összes játékot pagination-nel.

**Query paraméterek:**
- `page` (optional): Oldal száma (default: 1)

**Válasz:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Game Title",
      "description": "Game description",
      "price": "29.99",
      "cover_image": "https://example.com/image.jpg",
      "category": {
        "id": 1,
        "name": "Action",
        "slug": "action"
      },
      "created_at": "2026-02-24T07:20:00.000000Z",
      "updated_at": "2026-02-24T07:20:00.000000Z"
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/games?page=1",
    "last": "http://localhost:8000/api/games?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "per_page": 12,
    "to": 10,
    "total": 10
  }
}
```

---

### 3. Egy játék részletei

**Endpoint:** `GET /api/games/{id}`

**Leírás:** Visszaadja egy játék részletes adatait.

**Paraméterek:**
- `id`: A játék ID-ja

**Válasz:**
```json
{
  "data": {
    "id": 1,
    "title": "Game Title",
    "description": "Game description",
    "price": "29.99",
    "cover_image": "https://example.com/image.jpg",
    "category": {
      "id": 1,
      "name": "Action",
      "slug": "action"
    },
    "created_at": "2026-02-24T07:20:00.000000Z",
    "updated_at": "2026-02-24T07:20:00.000000Z"
  }
}
```

**Hiba (404):**
```json
{
  "message": "No query results for model [App\\Models\\Game] {id}"
}
```

---

### 4. Regisztráció

**Endpoint:** `POST /api/register`

**Leírás:** Új felhasználó regisztrálása.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Validációs szabályok:**
- `name`: kötelező, string, max 255 karakter
- `email`: kötelező, email formátum, egyedi, max 255 karakter
- `password`: kötelező, min 8 karakter, megerősítés szükséges

**Válasz (201):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": 2,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-02-24T07:20:00.000000Z",
    "updated_at": "2026-02-24T07:20:00.000000Z"
  },
  "access_token": "2|abc123...",
  "token_type": "Bearer"
}
```

**Hiba (422):**
```json
{
  "message": "The email has already been taken.",
  "errors": {
    "email": [
      "The email has already been taken."
    ]
  }
}
```

---

### 5. Bejelentkezés

**Endpoint:** `POST /api/login`

**Leírás:** Felhasználó bejelentkeztetése.

**Request body:**
```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

**Validációs szabályok:**
- `email`: kötelező, email formátum
- `password`: kötelező

**Válasz (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "created_at": "2026-02-24T07:20:00.000000Z",
    "updated_at": "2026-02-24T07:20:00.000000Z"
  },
  "access_token": "1|abc123...",
  "token_type": "Bearer"
}
```

**Hiba (422):**
```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": [
      "The provided credentials are incorrect."
    ]
  }
}
```

---

## 🔒 Védett Endpointok

**Minden kéréshez szükséges:**
```
Authorization: Bearer {your_token}
```

### 6. Aktuális felhasználó adatai

**Endpoint:** `GET /api/user`

**Leírás:** A bejelentkezett felhasználó adatainak lekérése.

**Válasz (200):**
```json
{
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "created_at": "2026-02-24T07:20:00.000000Z",
    "updated_at": "2026-02-24T07:20:00.000000Z"
  }
}
```

**Hiba (401):**
```json
{
  "message": "Unauthenticated."
}
```

---

### 7. Kijelentkezés

**Endpoint:** `POST /api/logout`

**Leírás:** Aktuális token törlése (kijelentkezés).

**Válasz (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### 8. Új játék létrehozása

**Endpoint:** `POST /api/games`

**Leírás:** Új játék hozzáadása az adatbázishoz.

**Request body:**
```json
{
  "title": "New Game Title",
  "description": "Detailed game description",
  "price": 49.99,
  "cover_image": "https://example.com/cover.jpg",
  "category_id": 1
}
```

**Validációs szabályok:**
- `title`: kötelező, string, max 255 karakter
- `description`: kötelező, string
- `price`: kötelező, szám, min 0
- `cover_image`: opcionális, string
- `category_id`: kötelező, létező kategória ID

**Válasz (200):**
```json
{
  "data": {
    "id": 11,
    "title": "New Game Title",
    "description": "Detailed game description",
    "price": "49.99",
    "cover_image": "https://example.com/cover.jpg",
    "category": {
      "id": 1,
      "name": "Action",
      "slug": "action"
    },
    "created_at": "2026-02-24T08:00:00.000000Z",
    "updated_at": "2026-02-24T08:00:00.000000Z"
  }
}
```

**Hiba (422):**
```json
{
  "message": "The title field is required.",
  "errors": {
    "title": [
      "The title field is required."
    ]
  }
}
```

---

### 9. Játék módosítása

**Endpoint:** `PUT /api/games/{id}`

**Leírás:** Meglévő játék módosítása.

**Paraméterek:**
- `id`: A játék ID-ja

**Request body:**
```json
{
  "title": "Updated Game Title",
  "description": "Updated description",
  "price": 39.99,
  "cover_image": "https://example.com/new-cover.jpg",
  "category_id": 2
}
```

**Validációs szabályok:** (ugyanazok mint a create-nél)

**Válasz (200):**
```json
{
  "data": {
    "id": 1,
    "title": "Updated Game Title",
    "description": "Updated description",
    "price": "39.99",
    "cover_image": "https://example.com/new-cover.jpg",
    "category": {
      "id": 2,
      "name": "RPG",
      "slug": "rpg"
    },
    "created_at": "2026-02-24T07:20:00.000000Z",
    "updated_at": "2026-02-24T08:10:00.000000Z"
  }
}
```

---

### 10. Játék törlése

**Endpoint:** `DELETE /api/games/{id}`

**Leírás:** Játék törlése az adatbázisból.

**Paraméterek:**
- `id`: A játék ID-ja

**Válasz (200):**
```json
{
  "message": "Game deleted successfully"
}
```

**Hiba (404):**
```json
{
  "message": "No query results for model [App\\Models\\Game] {id}"
}
```

---

## ❌ Hibakódok

| Kód | Jelentés |
|-----|----------|
| 200 | OK - Sikeres kérés |
| 201 | Created - Sikeres létrehozás |
| 401 | Unauthorized - Hiányzó vagy érvénytelen token |
| 404 | Not Found - Az erőforrás nem található |
| 422 | Unprocessable Entity - Validációs hiba |
| 500 | Server Error - Szerver hiba |

---

## 📝 Példa használat (curl)

### Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

### Játékok lekérése
```bash
curl http://localhost:8000/api/games
```

### Új játék létrehozása
```bash
curl -X POST http://localhost:8000/api/games \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title":"New Game",
    "description":"Description",
    "price":29.99,
    "cover_image":"https://example.com/img.jpg",
    "category_id":1
  }'
```

### Játék törlése
```bash
curl -X DELETE http://localhost:8000/api/games/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔄 Rate Limiting

Az API rate limiting-et használ:
- **API endpointok:** 60 kérés / perc

Túllépés esetén `429 Too Many Requests` választ kapsz.

---

## 📌 Jegyzetek

- Minden dátum ISO 8601 formátumban van (UTC timezone)
- Az árak 2 tizedesjegyű decimálok
- A pagination alapértelmezetten 12 elemet ad vissza oldalanként
- A token lejárati ideje nincs beállítva (stateful)
