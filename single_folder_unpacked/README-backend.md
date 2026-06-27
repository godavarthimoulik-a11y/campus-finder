Backend for CampusFinder

Quick start:
1. Copy .env.example to .env and set ADMIN_PASSWORD and JWT_SECRET.
2. npm install
3. npm run start

APIs:
- POST /api/auth/login { username, password } -> { token }
- GET /api/colleges?q=search -> list
- GET /api/colleges/:id -> details + courses + reviews
- POST /api/colleges (admin) -> create
- PUT /api/colleges/:id (admin) -> update
- DELETE /api/colleges/:id (admin) -> delete
- POST /api/colleges/:id/reviews -> add review

Security: uses JWT for admin routes. DB stored in db.sqlite (ignored by .gitignore).
