# Task Manager Application

A full-stack task manager application built with Node.js/Express (Backend) and React/Vite (Frontend). 

## Features
- **Core Requirements Met**: Create, view, update, and delete tasks.
- **Premium Design**: Vanilla CSS with a modern, glassmorphism-inspired dark theme and micro-animations.
- **Robust State Management**: Loading and error states properly handled with reactive UI updates.
- **Validation & Error Handling**: Backend validates incoming data and returns sensible HTTP responses.
- **Bonus Items Implemented**:
  - Filter tasks by active/completed status
  - Edit existing task titles (double-click a task title to edit)
  - Clean API service layer pattern in frontend

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

## Setup and Run Instructions

### 1. Backend Setup
The backend runs on port 3000 by default and uses an in-memory storage array.
```bash
cd backend
npm install
node server.js
```

### 2. Frontend Setup
The frontend uses Vite and connects to `http://localhost:3000/tasks`.
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

### 3. Usage
Open your browser and navigate to the URL provided by the Vite development server (usually `http://localhost:5173`).

---
### Technical Trade-offs & Assumptions
1. **In-Memory Database**: For the scope of a 1-2 hour assignment, setting up Postgres/MongoDB was omitted in favor of a robust in-memory array to focus purely on the frontend-to-backend API integration, routing, and component architecture. Data will reset upon backend restart.
2. **Vanilla CSS via index.css**: Used standard modern CSS to achieve a high-end UI without relying on heavy frameworks like Tailwind, demonstrating raw CSS proficiency as per general guidelines to minimize dependencies.
3. **No Redux/Zustand**: Since the state structure is inherently flat and relatively simple, built-in React hooks (`useState`, `useEffect`) and prop-drilling one level down was preferred to keep the cognitive load and codebase small.
