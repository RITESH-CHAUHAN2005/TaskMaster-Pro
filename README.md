# TaskMaster Pro 🧩  
**A Professional Multi-Tenant Task Management Platform (MERN Stack)**

TaskMaster Pro is a fully-featured task management platform built using the MERN stack. It supports multi-tenancy, role-based access control, task assignment with expiry, and real-time notifications.

---

## 🚀 Features

### ✅ Core (Mandatory)
- **Multi-Tenant Architecture**
  - Organization-based data isolation
  - Role-based access: `Admin`, `Manager`, `Member`
  - Invite system via email or link

- **Authentication & Authorization**
  - Secure login/registration using JWT
  - Role-based API protection
  - Onboarding for new or existing organizations

### 📝 Task Management
- CRUD operations for tasks
- Assign tasks to members
- Task categories: `Bug`, `Feature`, `Improvement`
- Task priorities: `Low`, `Medium`, `High`
- Due date with auto-expiry status update
- In-app notifications for overdue tasks

### 🛠️ DevOps & Deployment
- Fully containerized with **Docker**
- Production-ready **Docker Compose** setup
- Environment variable configuration
- CI/CD pipeline support (GitHub Actions / Any CI)
- MongoDB support with migration scripts

### 🔬 Testing
- Unit tests for core logic
- API integration tests
- Docker health checks for all containers

---

## 🧑‍💻 Tech Stack

- **Frontend**: React, Tailwind CSS / Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Auth**: JWT, bcrypt, Role-Based Access Control (RBAC)
- **Task Expiry**: `node-cron` (background job scheduler)
- **Notifications**: In-app toasts or alert system
- **Containerization**: Docker, Docker Compose
- **Deployment**: Ready for platforms like Render, DigitalOcean, or EC2

---