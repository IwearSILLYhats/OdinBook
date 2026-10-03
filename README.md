# OdinBook

OdinBook is a social media app inspired by Facebook, built as the final project for The Odin Project. The project includes a full-stack React frontend, an Express API, Prisma + PostgreSQL data access, Google OAuth, local email/password auth, and media uploads through Supabase Storage.

## Features

- User signup and login with email/password
- Google OAuth login flow
- Guest login
- JWT-based session cookies
- User profiles with avatar/banner support
- Feed with posts and replies
- Likes and follows
- Upload support for avatars, banners, and attachments
- Responsive layout built in React + Vite

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Node.js, Express
- Database: PostgreSQL with Prisma ORM
- Authentication: Passport.js, JWT, Google OAuth
- Storage: Supabase Storage
- Environment config: dotenv

## Project Structure

```text
OdinBook/
├── backend/
│   ├── routes/
│   ├── util/
│   ├── prisma/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── prisma.config.js
├── frontend/
│   ├── src/
│   ├── api/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── schema.prisma
├── README.md
└── package-lock.json
```

## Prerequisites

Before starting, make sure you have:

- Node.js 18+ installed
- PostgreSQL running locally or accessible remotely
- A Supabase project for storage uploads
- Google OAuth credentials if you want Google login enabled

## Backend Setup

1. Change into the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with values like:

   ```env
   PORT=3000
   FRONTEND=http://localhost:5173
   SECRET=your-super-secret-jwt-key
   DATABASE_URL="postgresql://username:password@localhost:5432/odinbook?schema=public"
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-anon-or-service-role-key
   ```

4. Generate Prisma client and apply the schema to your database:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

   If you prefer to sync without generating a migration, you can also use:

   ```bash
   npx prisma db push
   ```

5. Start the API server:

   ```bash
   npm start
   ```

   The backend runs on the port defined in `PORT` (default: `3000`).

## Frontend Setup

1. Change into the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

5. Open the local app in your browser, typically at:

   ```text
   http://localhost:5173
   ```

## Typical Development Workflow

- Start PostgreSQL and ensure the database exists
- Run the backend API
- Run the frontend dev server
- Visit the frontend URL and sign in or create a new account

## Notes

- The backend sets JWT cookies using `secure_session`.
- Google OAuth redirects back to `FRONTEND + "/app"`.
- Supabase storage is expected for avatar, banner, and attachment uploads.
- This project is a full-stack prototype and is intended for local development and learning.

## Useful Commands

Backend:

```bash
cd backend
npm install
npm start
npx prisma generate
npx prisma migrate dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
npm run build
```

## License

This project is for educational use as part of The Odin Project curriculum.
