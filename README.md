# Issue Management System
A full-stack Issue Management System demonstrating authentication, authorization, and role-based access control.

## Overview
Users can create and track their own issues, while admins can view, manage, and update issue statuses.
All authorization is enforced on the backend; frontend role checks exist only for user experience.

## Why This Project
Built to demonstrate secure backend authorization, role-based access control, and clean REST API design as used in real-world production systems.

## Features

### Authentication & Authorization
- JWT-based authentication
- Protected routes
- Role-based access (`user`, `admin`)
- Token validated on the backend

### User Capabilities
- Register & login 
- Create issues
- View and delete only their own issues

Issue ownership is enforced at the database query level.

### Admin Capabilities
- View all issues
- Update issue status (`open`, `in-progress`, `resolved`)
- Delete any issue

### Issue Status Flow
- `open` -> `in-progress` -> `resolved`

Status values are normalized (lowercase) across frontend, backend, and database to avoid inconsistencies.

## Design Philosophy
This project prioritizes:
- Backend-driven security
- Clean REST API design
- Proper HTTP status codes
- Role-based access control
- Minimal UI by design

The Backend is the single source of truth for authorization.
All critical access control is enforced on the server using JWT role claims.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT

### Frontend
- React
- React Router 
- Axios
- Vanilla CSS

## Project Structure

```
backend/
 ├─ controllers/
 ├─ middleware/
 ├─ models/
 ├─ routes/
 ├─ .env.example
 └─ server.js

frontend/
 ├─ api/
 ├─ components/
 ├─ pages/
 ├─ utils/
 └─ App.jsx
```

## Environment Variables
Both frontend and backend include a `.env.example` file for clarity.

### Backend
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend
```env
VITE_API_URL=http://localhost:8080/api
```

Rename `.env.example` to `.env` and provide actual values.

## Running the Project Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Security & HTTP Status Codes
The API consistently uses standard HTTP status codes:
- 200 -> Success
- 201 -> Resource created
- 400 -> Validation error
- 401 -> Unauthorized
- 403 -> Forbidden
- 404 -> Not found
- 409 -> Conflict
- 500 -> Server error

## Validation Strategy
- Frontend validation improves UX
- Backend validation is mandatory and authoritative
- Client-side checks cannot bypass server rules

## Tested Scenarios
- Users cannot view or modify others' issues
- Non-admin users cannot access admin routes
- Only admins can update issue status
- Backend authorization remains enforced even if frontend routing is bypassed

## Future Improvements
- Enforce clearer UI-level role separation by restricting admin access to user dashboards
- Add optional role-based redirects to prevent cross-role navigation
- Improve UX clarity between user and admin workflows