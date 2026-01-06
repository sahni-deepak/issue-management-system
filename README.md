![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![React](https://img.shields.io/badge/React-Frontend-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![RBAC](https://img.shields.io/badge/Security-Role--Based_Access-red)
![Deployed](https://img.shields.io/badge/Status-Deployed-success)

# Issue Management System
A full-stack Issue Management System demonstrating authentication, authorization, and role-based access control.

## Overview
Users can create and track their own issues, while admins can view, manage, and update issue statuses. The application is fully deployed and production-ready.

## Why This Project
Built to demonstrate secure backend authorization, role-based access control, and clean REST API design as used in real-world production systems.

## Live Deployment
This project is fully deployed using modern cloud platforms.
Due to free-tier hosting limits, the live demo URL is not publicly exposed to prevent unnecessary downtime. 
The live link can be shared upon request.

## Features

### Authentication & Authorization
- JWT-based authentication
- Protected routes
- Role-based access (`user`, `admin`)
- Token validation on the backend

### User Capabilities
- Register & login 
- Create issues
- View and delete their own issues

### Admin Capabilities
- View all issues
- Update issue status (`open`, `in-progress`, `resolved`)
- Delete any issue

### Issue Status Flow
`open` -> `in-progress` -> `resolved`

## Design Philosophy
This project prioritizes:
- Backend-driven security
- Clean REST API design
- Proper HTTP status codes
- Role-based access control
- Minimal UI by design

Authorization is enforced on the backend regardless of client-side routing.

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
 ├─ package.json
 ├─ package-lock.json
 └─ server.js

frontend/
 ├─ src/
 │  ├─ api/
 │  ├─ components/
 │  ├─ pages/
 │  ├─ utils/
 │  ├─ App.jsx
 │  ├─ App.css
 │  ├─ index.css
 │  └─ main.jsx
 ├─ .env.example
 ├─ eslint.config.js
 ├─ index.html
 ├─ package.json
 ├─ package-lock.json
 ├─ vercel.json
 └─ vite.config.js
```

## Environment Variables
Both frontend and backend have a `.env.example` file for required environment variables.

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

## Tested Scenarios
- Users cannot view or modify others' issues
- Non-admin users cannot access admin routes
- Only admins can update issue status

## Future Improvements
- Improve UI-level role separation between user and admin workflows