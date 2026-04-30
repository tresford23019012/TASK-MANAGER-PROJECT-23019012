# Tresify Backend API

## Student Information
- Name:Tresford Chabu Chipili
- Module: INFS 202 Web design and web development
- Project: Midterm Backend Project

---

## Project Description
Tresify Backend is a RESTful API built with Node.js and Express.
It powers the Tresify productivity web application, handling user
authentication, task management, and database storage.

---

## Tech Stack
| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | API framework |
| SQLite | SQL database |
| JWT | Authentication tokens |
| bcryptjs | Password encryption |
| CORS | Cross origin requests |
| dotenv | Environment variables |

---

## Project Structure
tresify-backend/
│
├── database/
│   └── db.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth.js
│   └── tasks.js
├── .env
├── server.js
└── package.json

---


## API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get token |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| PATCH | /api/tasks/:id/complete | Toggle complete |

---

## Database Design

### Users Table
| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| name | TEXT | Full name |
| email | TEXT | Unique email |
| password | TEXT | Hashed password |
| createdAt | DATETIME | Account created |

### Tasks Table
| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| title | TEXT | Task title |
| description | TEXT | Task details |
| category | TEXT | School/Gym/Personal |
| priority | TEXT | High/Medium/Low |
| dueDate | TEXT | Due date |
| completed | INTEGER | 0 or 1 |
| userId | INTEGER | Foreign key to users |
| createdAt | DATETIME | Task created |

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm
- Git

### Installation Steps

1. Clone the repository:
git clone https://github.com/tresford23019012/tresify-backend.git

2. Navigate into the folder:
cd tresify-task-manager-backend

3. Install dependencies:
npm install

4. Create a `.env` file:
PORT=5000
JWT_SECRET=tresify_super_secret_key_2026

5. Start the server:
node server.js

6. Server runs at:
http://localhost:5000

---

## Security Features
-  Passwords hashed with bcryptjs
-  JWT authentication on all task routes
-  Environment variables for secrets
-  Input validation on all endpoints
-  Error handling throughout

---

## Live URL
- Frontend: (to be added after deployment)
- Backend: (to be added after deployment)