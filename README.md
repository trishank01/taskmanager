# 📋 Task Management Dashboard – Frontend

A modern and responsive task management dashboard designed for both individual productivity and team collaboration. This is the **frontend** built with modern React tooling and structured for scalability.

---

## 🚀 Features

### ✅ User Features
- **Dashboard:** View personal task metrics, deadlines, and overall progress.
- **Task Tracking:** View, filter, and manage tasks by priority, due dates, or status.
- **Automated Updates:** Task statuses update automatically based on checklist progress.
- **Attachments:** Add and access file links for each task.
- **Mobile Ready:** Seamless user experience across desktop, tablet, and mobile.

### 👨‍💼 Admin Features
- **Task Management:** Create and manage tasks, assign users, update priorities.
- **User Management:** Add, remove, and monitor user access and performance.
- **Download Reports:** Export task-related data for analysis (CSV/PDF planned).
- **Team Collaboration:** Assign tasks to multiple users and track their contributions.

---

## 🛠️ Tech Stack

- **Framework:** React (via Vite)
- **UI:** Tailwind CSS (or your preferred CSS system)
- **Routing:** React Router
- **State Management:** React Context API
- **Icons:** Heroicons / Lucide / React Icons
- **Authentication:** Custom auth logic (`useUserAuth`)

---

## 📁 Folder Structure

src/
├── assets/ # Static files like images/icons
├── components/ # UI components like Cards, Charts, Inputs
│ ├── layout/ # Layout-specific components (AvatarGroup, Progress, etc.)
├── context/ # Context for global state (user context)
├── hooks/ # Custom hooks (e.g., authentication)
├── pages/ # Route-based views
│ ├── Admin/ # Admin views (task, user, and dashboard management)
│ ├── Auth/ # Auth views (Login, Signup)
│ └── User/ # User views (My Tasks, User Dashboard)
└── App.jsx # Main app entry point


## 📦 Getting Started

### 1. Clone the repository

````bash
git clone https://github.com/yourusername/task-dashboard-frontend.git
cd task-dashboard-frontend
````



### 2. Install dependencies

npm install
# or
yarn install


### 3. Run the app

npm run dev
# or
yarn dev


### 📲 Responsive Design
Designed with mobile-first principles:

Fully responsive across desktop, tablet, and mobile devices

Scalable layout and typography

Touch-friendly UI for task management

### 🔐 Authentication
Basic auth system with:

Login & Signup pages (Auth/Login.jsx, Auth/SignUp.jsx)

Auth context (context/userContext.jsx)

Custom hook for auth logic (hooks/useUserAuth.jsx)

You can plug in your backend auth endpoints or Firebase integration.

### 📊 Pages Overview
Page	Path	Description
Admin Dashboard	/admin/dashboard	Overview of tasks and user metrics
Manage Tasks	/admin/manage-tasks	Create/update/delete/assign tasks
Manage Users	/admin/manage-users	View & control team members
User Dashboard	/user/dashboard	Personal view of tasks, progress, stats
My Tasks	/user/my-tasks	User’s detailed task list
Login	/login	Auth login screen
Signup	/signup	Auth registration screen

### 📥 Future Improvements
Task reminders & calendar integration

Notification system

Commenting & chat per task

Dark mode support

Drag-and-drop task reordering

### 🤝 Contributing
Pull requests are welcome. For significant changes, please open an issue first to discuss improvements or changes.