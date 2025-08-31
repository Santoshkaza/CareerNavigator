# MERN Backend Setup

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

## Setup
1. `cd server`
2. `npm install`
3. Create a `.env` file (see example in repo)
4. Start MongoDB locally (`mongod`)
5. `npm run dev` (for development with nodemon)

## API Endpoints
- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login

## Troubleshooting
- Ensure MongoDB is running on `mongodb://localhost:27017/techcareer` or update `.env`.
- Check terminal for errors.
