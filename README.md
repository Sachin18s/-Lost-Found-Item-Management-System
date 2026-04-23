# Campus Lost & Found System

A modern, full-stack MERN application for managing lost and found items on a college campus.

## Features
- **User Authentication**: Secure JWT-based login and registration with bcrypt password hashing.
- **Dashboard**: A clean, responsive dashboard to manage reported items.
- **Item Management**: Report, edit, and delete lost or found items.
- **Search & Filter**: Real-time searching by item name and filtering by type (Lost / Found).
- **Responsive UI**: Built with React and Tailwind CSS v4 for a seamless experience across all devices.

## Technologies Used
- **Frontend**: React.js (Vite), Tailwind CSS v4, Lucide React, React Toastify, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

## Prerequisites
- **Node.js** installed on your machine
- **MongoDB** running locally (or update the `MONGO_URI` in `backend/.env` with your MongoDB Atlas connection string)

## Setup and Running the Application

### 1. Start the Backend
Open a terminal, navigate to the `backend` directory, and start the server:
```bash
cd backend
node server.js
```
*The backend server will run on `http://localhost:5000`.*

### 2. Start the Frontend
Open a new terminal, navigate to the `frontend` directory, and start the development server:
```bash
cd frontend
npm run dev
```
*The React app will be accessible at `http://localhost:5173`.*

## Deployment
- **Backend**: Can be deployed to platforms like **Render**, **Railway**, or **Heroku**. Make sure to set the environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
- **Frontend**: Can be deployed to **Vercel**, **Netlify**, or **GitHub Pages**. Update the `baseURL` in `frontend/src/utils/api.js` to point to your deployed backend URL.
