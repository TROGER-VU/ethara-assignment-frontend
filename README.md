# 🚀 Team Task Manager (Full-Stack)

A full-stack web application that allows users to create projects, manage teams, assign tasks, and track progress with role-based access control.

## 🧠 Features

### 🔐 Authentication
- User Signup & Login
- JWT-based authentication
- Secure protected routes

### 👥 Project & Team Management
- Create projects
- Add members to projects
- Role-based access (Admin / Member)

### ✅ Task Management
- Create tasks with:
  - Title
  - Description
  - Priority
  - Due Date
- Assign tasks to project members
- Update task status (Todo / In Progress / Done)

### 📊 Dashboard
- View assigned tasks
- Overdue tasks tracking
- Project-level statistics:
  - Total tasks
  - Todo / In-progress / Done
- Progress bar visualization

---

## ⚙️ Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- PostgreSQL (pg)

### Deployment
- Frontend: Vercel
- Backend: Railway

---

## 🧱 Architecture

- RESTful API design
- PostgreSQL relational schema:
  - users
  - projects
  - tasks
  - project_members
- Role-based access control (RBAC)
- Modular controllers & routes

---

## 🔐 API Highlights

- `POST /auth/signup`
- `POST /auth/login`
- `GET /projects/my`
- `POST /projects`
- `POST /projects/add-member`
- `GET /tasks/:projectId`
- `POST /tasks`
- `POST /tasks/assign`
- `PATCH /tasks/status`
- `GET /tasks/stats/:projectId`

---

## 🧪 How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev