# Auth (JWT) — Register & Login

## New Endpoints

- `POST /api/auth/register` — create a user and get JWT
- `POST /api/auth/login` — (optional) login and get JWT

### Request: POST /api/auth/register
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123",
  "age": 20
}
```
### Response
```json
{
  "token": "jwt.token.here",
  "user": {
    "_id": "...",
    "name": "Alice",
    "email": "alice@example.com",
    "age": 20,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Setup

1. Install deps:
```
npm i
```
(If needed: `npm i bcrypt jsonwebtoken`)

2. Add to `.env`:
```
MONGO_URI=mongodb://localhost:27017/your_db
PORT=5000
JWT_SECRET=your_super_secret
JWT_EXPIRES_IN=7d
```

3. Run:
```
npm start
```

## Protecting Routes

Use the `auth.middleware.js` on routes that need auth:
```js
const requireAuth = require('./middlewares/auth.middleware');
app.get('/api/secure', requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});
```
