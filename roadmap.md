# StudyZen — AI-Powered Student Productivity Platform

> **Project Type:** Full-Stack Web Application
> **Development Time:** 7 Days
> **Primary Goal:** Build, test, and deploy a polished MVP suitable for a portfolio/resume.
> **Development Style:** Phase-by-phase, production-style architecture without unnecessary overengineering.

---

# 1. PROJECT OVERVIEW

## 1.1 Project Name

**StudyZen**

## 1.2 Project Description

StudyZen is an AI-powered student productivity platform that provides students with a centralized place to manage academic tasks, deadlines, priorities, and productivity.

The platform also provides an AI assistant capable of:

1. Explaining academic topics.
2. Generating personalized study plans.
3. Summarizing study material.

---

# 2. FINAL TECH STACK

## Frontend

* React.js
* Vite
* JavaScript
* React Router
* CSS / Tailwind CSS if already configured
* Axios or Fetch API

## Backend

* Node.js
* Express.js
* JavaScript
* REST API

## Database

* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt

## AI

* External AI API
* API key must remain on the backend

## Deployment

* Frontend: production deployment platform
* Backend: production deployment platform
* Database: MongoDB Atlas

---

# 3. CORE FEATURES

The final application MUST contain:

### Authentication

* User registration
* User login
* Password hashing
* JWT authentication
* Protected routes
* Logout
* Current-user retrieval

### Dashboard

* Personalized greeting
* Task statistics
* Pending tasks
* Completed tasks
* Upcoming deadlines
* Productivity summary

### Task Management

* Create task
* View tasks
* View individual task
* Update task
* Delete task
* Mark task completed
* Priority
* Deadline
* Category
* Search
* Filtering
* Sorting if practical

### Productivity Analytics

* Total tasks
* Completed tasks
* Pending tasks
* Overdue tasks
* Completion percentage
* Basic productivity visualization

### AI Assistant

* Explain academic topic
* Generate study plan
* Summarize study material

### User Profile

* View profile
* Update basic profile information

### Error Handling

* API error handling
* Authentication errors
* Validation errors
* Frontend loading states
* Frontend error states
* Empty states

### Deployment

* Production frontend
* Production backend
* MongoDB Atlas
* Environment variables
* Secure API configuration

---

# 4. IMPORTANT DEVELOPMENT RULES

The AI/developer working on this project MUST follow these rules.

## Rule 1 — Build Phase by Phase

Do NOT implement the entire project at once.

Complete one phase before starting the next phase.

---

## Rule 2 — Do Not Overengineer

This is a 7-day portfolio project.

Do NOT add:

* Socket.io
* Real-time chat
* Google OAuth
* Email verification
* Complex RBAC
* Admin dashboard
* Calendar synchronization
* Push notifications
* Payment systems
* RAG
* Vector databases
* Custom ML models
* Microservices
* Docker unless necessary
* Kubernetes
* Complex event-driven architecture

These are outside the project scope.

---

## Rule 3 — Preserve Existing Work

Before modifying existing files:

1. Inspect the repository.
2. Understand the existing structure.
3. Reuse working code where possible.
4. Do not unnecessarily rewrite working features.

---

## Rule 4 — Use Environment Variables

Never hardcode:

* MongoDB credentials
* JWT secret
* AI API key
* Production URLs

Use `.env`.

Example:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
AI_API_KEY=
CLIENT_URL=
```

Never commit `.env`.

Provide `.env.example`.

---

## Rule 5 — Backend Architecture

Use separation of concerns.

Preferred structure:

```text
server/
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   ├── userController.js
│   └── aiController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   ├── userRoutes.js
│   └── aiRoutes.js
│
├── utils/
│   └── ...
│
├── app.js
└── server.js
```

The exact structure can be adjusted if the existing project already has a good architecture.

---

# 5. REQUEST FLOW

The expected backend request flow is:

```text
React Component
      ↓
Frontend API Service
      ↓
REST API
      ↓
Express Route
      ↓
Middleware
      ↓
Controller
      ↓
Model
      ↓
MongoDB
      ↓
Controller Response
      ↓
Frontend
```

For AI:

```text
React
 ↓
POST /api/ai/...
 ↓
Express Route
 ↓
Authentication Middleware
 ↓
AI Controller
 ↓
AI API
 ↓
Response
 ↓
React
```

The AI API key MUST NOT be exposed to the frontend.

---

# 6. DEVELOPMENT PHASES

---

# PHASE 0 — PROJECT FOUNDATION

## Time

**Day 1 — Morning**

## Objective

Create the basic full-stack architecture and establish communication between frontend, backend, and MongoDB.

## Tasks

### Frontend

* Create/configure React + Vite application.
* Configure React Router.
* Create basic application structure.
* Create API service layer.
* Create initial layout.

### Backend

* Initialize Node.js project.
* Install Express.
* Configure middleware.
* Configure CORS.
* Configure dotenv.
* Create server.
* Create basic health-check route.

### Database

* Configure MongoDB.
* Configure Mongoose.
* Create database connection.
* Test database connection.

## Initial API

```http
GET /api/health
```

Expected response:

```json
{
  "success": true,
  "message": "MySpace API is running"
}
```

## Acceptance Criteria

* [ ] React application starts successfully.
* [ ] Express server starts successfully.
* [ ] MongoDB connection succeeds.
* [ ] Frontend can communicate with backend.
* [ ] `/api/health` works.
* [ ] `.env` is configured.
* [ ] `.env` is ignored by Git.
* [x] React application starts successfully.
* [x] Express server starts successfully.
* [x] MongoDB connection configured.
* [x] Frontend can communicate with backend.
* [x] `/api/health` works.
* [x] `.env` is configured.
* [x] `.env` is ignored by Git.

## Completion Condition

Do not proceed until the complete stack works:

```text
React → Express → MongoDB
```

---

# PHASE 1 — AUTHENTICATION

## Time

**Day 1 — Afternoon + Evening**

## Objective

Implement secure user registration and login using JWT.

---

## User Model

Create:

```text
User
├── name
├── email
├── password
├── profile
│   ├── college
│   ├── academicGoal
│   └── studyPreference
└── createdAt
```

Password MUST be hashed.

Never store plain-text passwords.

---

## Backend API

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Student",
  "email": "student@example.com",
  "password": "password"
}
```

### Login

```http
POST /api/auth/login
```

### Current User

```http
GET /api/auth/me
```

Requires JWT.

---

## Authentication Middleware

Create middleware that:

1. Reads JWT.
2. Verifies JWT.
3. Extracts user ID.
4. Attaches user to request.
5. Rejects invalid/missing tokens.

---

## Frontend

Create:

```text
/login
/register
```

Implement:

* Form validation
* Login
* Registration
* Authentication state
* Protected routes
* Logout
* Redirect unauthenticated users

---

## Error Cases

Handle:

* Duplicate email
* Invalid email
* Missing fields
* Incorrect password
* Invalid JWT
* Expired JWT
* Unauthorized request

---

## Acceptance Criteria

* [ ] User can register.
* [ ] Password is hashed.
* [ ] User can login.
* [ ] JWT is generated.
* [ ] Protected API works.
* [ ] Invalid JWT is rejected.
* [ ] User can logout.
* [ ] Protected frontend routes work.
* [ ] Authentication survives page refresh appropriately.
* [x] User can register.
* [x] Password is hashed.
* [x] User can login.
* [x] JWT is generated.
* [x] Protected API works.
* [x] Invalid JWT is rejected.
* [x] User can logout.
* [x] Protected frontend routes work.
* [x] Authentication survives page refresh appropriately.

## Completion Condition

The following flow MUST work:

```text
Register
   ↓
Login
   ↓
JWT
   ↓
Protected Dashboard
   ↓
Logout
```

---

# PHASE 2 — DASHBOARD UI

## Time

**Day 2**

## Objective

Create the main MySpace student dashboard.

---

## Dashboard Layout

The dashboard should contain:

```text
Sidebar / Navbar

Dashboard
Tasks
Analytics
AI Assistant
Profile
Logout
```

Main dashboard:

```text
Greeting

Statistics
├── Total Tasks
├── Completed
├── Pending
└── Overdue

Today's Tasks

Upcoming Deadlines

Productivity Summary
```

---

## UI Requirements

The UI should be:

* Clean
* Modern
* Student-focused
* Responsive
* Consistent
* Easy to navigate

Avoid unnecessary animations.

---

## Components

Suggested:

```text
components/
├── Navbar
├── Sidebar
├── StatCard
├── TaskCard
├── TaskList
├── LoadingSpinner
├── ErrorMessage
└── EmptyState
```

---

## Acceptance Criteria

* [x] Dashboard is accessible after login.
* [x] Navigation works.
* [x] Dashboard is responsive.
* [x] Placeholder statistics are displayed.
* [x] Empty states are handled.
* [x] Loading states exist where required.

---

# PHASE 3 — TASK MANAGEMENT

## Time

**Day 3**

## Objective

Implement complete task management functionality.

---

# Task Model

```text
Task
├── user
├── title
├── description
├── priority
├── status
├── deadline
├── category
└── createdAt
```

---

# Priority

Allowed values:

```text
High
Medium
Low
```

---

# Status

Allowed values:

```text
Pending
In Progress
Completed
```

---

# CRUD API

### Create

```http
POST /api/tasks
```

### Get all

```http
GET /api/tasks
```

### Get one

```http
GET /api/tasks/:id
```

### Update

```http
PUT /api/tasks/:id
```

### Delete

```http
DELETE /api/tasks/:id
```

---

# Security Requirement

Users MUST only be able to access their own tasks.

A user must never be able to:

* Read another user's tasks.
* Update another user's task.
* Delete another user's task.

---

# Frontend

Create:

```text
/tasks
```

Implement:

* Create task form
* Task list
* Edit task
* Delete task
* Complete task
* Priority indicator
* Deadline display
* Category display

---

# Search

Example:

```text
Search tasks...
```

Search should match task titles and/or descriptions.

---

# Filtering

Provide:

```text
All
Pending
In Progress
Completed
High Priority
```

---

# Acceptance Criteria

* [ ] Create task works.
* [ ] Read tasks works.
* [ ] Update task works.
* [ ] Delete task works.
* [ ] Complete task works.
* [ ] Search works.
* [ ] Filtering works.
* [ ] Task ownership is enforced.
* [ ] Empty task state is handled.
* [ ] API errors are displayed properly.

## Completion Condition

A user can completely manage their own tasks from the frontend.

---

# PHASE 4 — PRODUCTIVITY ANALYTICS

## Time

**Day 4**

## Objective

Convert task data into useful productivity information.

---

# Metrics

Calculate:

```text
Total Tasks
Completed Tasks
Pending Tasks
In Progress Tasks
Overdue Tasks
Completion Rate
```

Formula:

```text
Completion Rate =
Completed Tasks / Total Tasks × 100
```

Handle zero tasks safely.

Do NOT divide by zero.

---

# Dashboard Statistics

Connect real MongoDB data to dashboard cards.

Example:

```text
Total Tasks       20
Completed         12
Pending            6
Overdue            2
Completion Rate   60%
```

---

# Analytics Page

Create:

```text
/analytics
```

Display:

* Completion rate
* Task status breakdown
* Priority breakdown
* Basic productivity trend

A chart library may be used if it can be integrated quickly.

---

# Acceptance Criteria

* [ ] Dashboard statistics use real data.
* [ ] Completion rate is correct.
* [ ] Overdue tasks are calculated correctly.
* [ ] Analytics page works.
* [ ] Zero-task case works.
* [ ] Analytics update after task changes.

---

# PHASE 5 — AI ASSISTANT

## Time

**Day 5**

## Objective

Integrate an AI API into MySpace through the backend.

---

# AI Page

Create:

```text
/ai
```

Interface:

```text
              MySpace AI

How can I help you?

[ Ask your academic question... ]

[Ask AI]
```

---

# FEATURE 1 — TOPIC EXPLANATION

User enters:

```text
Explain binary search in simple terms.
```

AI returns an understandable explanation.

---

# FEATURE 2 — STUDY PLAN

User provides:

```text
Subject
Available days
Daily study time
Current level
```

Example:

```text
Subject: DBMS
Days: 10
Daily time: 2 hours
Level: Beginner
```

AI generates a structured study plan.

---

# FEATURE 3 — SUMMARIZATION

User enters/pastes study material.

AI returns:

```text
Summary
Key Concepts
Important Points
Exam-Focused Notes
```

---

# Backend API

Suggested endpoints:

```http
POST /api/ai/explain
POST /api/ai/study-plan
POST /api/ai/summarize
```

All AI routes should require authentication.

---

# AI Security

The AI API key MUST exist only on the backend.

Correct:

```text
React
 ↓
Backend
 ↓
AI API
```

Incorrect:

```text
React
 ↓
AI API
```

with the secret key exposed in frontend code.

---

# AI Error Handling

Handle:

* Missing API key
* AI API failure
* Rate limits
* Empty input
* Timeout
* Invalid response

Display useful messages to users.

---

# Acceptance Criteria

* [ ] AI page works.
* [ ] Topic explanation works.
* [ ] Study plan generation works.
* [ ] Summarization works.
* [ ] AI key is not exposed.
* [ ] AI routes are protected.
* [ ] AI errors are handled.
* [ ] Loading state exists.

---

# PHASE 6 — PROFILE + POLISH + ERROR HANDLING

## Time

**Day 6**

## Objective

Finish secondary features and make the application production-quality.

---

# PROFILE

Create:

```text
/profile
```

Allow users to view/update:

```text
Name
Email
College
Academic Goal
Study Preference
```

Do not allow users to modify protected fields incorrectly.

---

# GLOBAL ERROR HANDLING

Backend should have centralized error middleware.

Handle:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

---

# FRONTEND STATES

Every major API-driven component should account for:

```text
Loading
Success
Error
Empty
```

Example:

```text
Loading tasks...

No tasks found.

Failed to load tasks.

Tasks loaded successfully.
```

---

# VALIDATION

Validate:

* Required fields
* Email format
* Password length
* Task title
* Deadline
* Priority
* Status

---

# UI POLISH

Check:

* Responsive layout
* Consistent spacing
* Typography
* Buttons
* Forms
* Error messages
* Empty states
* Loading states
* Navigation
* Mobile layout

Do NOT spend excessive time on visual perfection.

---

# ACCEPTANCE CRITERIA

* [ ] Profile works.
* [ ] Error middleware works.
* [ ] Validation works.
* [ ] Loading states work.
* [ ] Empty states work.
* [ ] Error states work.
* [ ] Responsive layout works.
* [ ] No major UI bugs remain.

---

# PHASE 7 — DEPLOYMENT + TESTING

## Time

**Day 7**

## Objective

Deploy the complete application and verify the production environment.

---

# Production Architecture

```text
                   INTERNET
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
     React Frontend          Express Backend
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
                MongoDB        JWT          AI API
                 Atlas
```

---

# Environment Variables

## Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
AI_API_KEY=
CLIENT_URL=
```

## Frontend

```env
VITE_API_URL=
```

Never expose backend secrets through frontend environment variables.

---

# Production Checklist

### Frontend

* [ ] Production build works.
* [ ] API URL points to production backend.
* [ ] Routing works.
* [ ] Refreshing routes works.
* [ ] Responsive UI works.

### Backend

* [ ] Production server starts.
* [ ] MongoDB connects.
* [ ] CORS configured correctly.
* [ ] Environment variables configured.
* [ ] Error handling works.
* [ ] AI API works.

### Database

* [ ] MongoDB Atlas configured.
* [ ] Production connection works.
* [ ] User data persists.
* [ ] Task data persists.

---

# FINAL END-TO-END TEST

Perform this exact flow:

```text
1. Open production URL
       ↓
2. Register account
       ↓
3. Login
       ↓
4. Open Dashboard
       ↓
5. Create task
       ↓
6. Edit task
       ↓
7. Mark task completed
       ↓
8. Search task
       ↓
9. Filter tasks
       ↓
10. Check Analytics
       ↓
11. Open AI Assistant
       ↓
12. Explain topic
       ↓
13. Generate study plan
       ↓
14. Summarize material
       ↓
15. Open Profile
       ↓
16. Update profile
       ↓
17. Logout
       ↓
18. Login again
       ↓
19. Verify data persists
```

---

# 7. FINAL PROJECT STRUCTURE

The final structure should approximately look like:

```text
MySpace/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── AI.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── taskService.js
│   │   │   └── aiService.js
│   │   │
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   ├── userController.js
│   │   └── aiController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── userRoutes.js
│   │   └── aiRoutes.js
│   │
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
├── ROADMAP.md
└── .gitignore
```

The AI may modify this structure if a better equivalent structure already exists.

---

# 8. API SUMMARY

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Tasks

```text
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## User

```text
GET /api/users/profile
PUT /api/users/profile
```

## AI

```text
POST /api/ai/explain
POST /api/ai/study-plan
POST /api/ai/summarize
```

## Health

```text
GET /api/health
```

---

# 9. GIT DEVELOPMENT STRATEGY

Commit after completing each meaningful feature.

Suggested commits:

```text
feat: initialize full stack project
feat: add mongodb connection
feat: implement jwt authentication
feat: add dashboard layout
feat: implement task management
feat: add task search and filtering
feat: add productivity analytics
feat: integrate ai assistant
feat: add user profile
feat: add centralized error handling
fix: resolve production issues
chore: prepare application for deployment
```

Do NOT create hundreds of meaningless commits.

---

# 10. DEFINITION OF DONE

The project is considered COMPLETE only when:

## Functionality

* [ ] Authentication works.
* [ ] Dashboard works.
* [ ] Task CRUD works.
* [ ] Search works.
* [ ] Filtering works.
* [ ] Analytics works.
* [ ] AI explanation works.
* [ ] AI study-plan generation works.
* [ ] AI summarization works.
* [ ] Profile works.

## Security

* [ ] Passwords are hashed.
* [ ] JWT authentication works.
* [ ] Protected routes work.
* [ ] Users can only access their own tasks.
* [ ] Secrets are stored in environment variables.
* [ ] AI API key is not exposed to frontend.

## Quality

* [ ] API errors are handled.
* [ ] Loading states exist.
* [ ] Empty states exist.
* [ ] Input validation exists.
* [ ] Responsive UI works.
* [ ] No major console errors.
* [ ] No major broken routes.

## Deployment

* [ ] Frontend deployed.
* [ ] Backend deployed.
* [ ] MongoDB Atlas connected.
* [ ] Production environment variables configured.
* [ ] End-to-end production test completed.

---

# 11. AI AGENT INSTRUCTIONS

If an AI coding agent is given this repository and this `ROADMAP.md`, it MUST follow the instructions below.

## Before Starting

1. Inspect the repository.
2. Identify existing frontend/backend code.
3. Determine which phase is currently complete.
4. Do not recreate working functionality.
5. Read `ROADMAP.md`.
6. Continue from the first incomplete phase.

## During Development

For every phase:

```text
Understand
   ↓
Plan
   ↓
Implement
   ↓
Run/Test
   ↓
Fix Errors
   ↓
Verify Acceptance Criteria
   ↓
Mark Phase Complete
```

Do not move to the next phase if the current phase has critical failures.

## When Errors Occur

Prioritize:

1. Runtime errors
2. API errors
3. Database errors
4. Authentication/security errors
5. Broken functionality
6. UI issues
7. Cosmetic improvements

Do not rewrite the entire project to fix a small bug.

---

# 12. CURRENT PROJECT STATUS

Update this section after completing each phase.

```text
PHASE 0 — Project Foundation       [x]
PHASE 1 — Authentication            [x]
PHASE 2 — Dashboard                 [x]
PHASE 3 — Task Management           [ ]
PHASE 4 — Productivity Analytics    [ ]
PHASE 5 — AI Assistant              [ ]
PHASE 6 — Profile & Polish          [ ]
PHASE 7 — Deployment                [ ]
```

Use:

```text
[ ] = Not Started
[~] = In Progress
[x] = Completed
```

---

# 13. PRIORITY SYSTEM

If time becomes limited, prioritize features in this order:

## P0 — MUST HAVE

```text
Authentication
Task CRUD
Dashboard
MongoDB
REST API
Deployment
```

## P1 — IMPORTANT

```text
Search
Filtering
Analytics
AI Assistant
Error Handling
Profile
```

## P2 — OPTIONAL

```text
Advanced charts
Extra UI animations
Advanced task sorting
Additional profile fields
Minor visual improvements
```

If time is running out, complete all P0 features before spending time on P2 features.

---

# 14. RESUME ALIGNMENT

The completed project should support the following resume claims:

> **MySpace – AI-Powered Student Productivity Platform**
> React.js, Node.js, Express.js, MongoDB, JWT, AI API

> • Developed a full-stack student productivity platform to manage tasks, priorities, deadlines, and academic activities through a centralized dashboard.

Supported by:

```text
React
Express
MongoDB
Task CRUD
Dashboard
Deadlines
Priorities
```

> • Implemented JWT-based authentication, user profiles, task management, search and filtering, productivity analytics, and API error handling.

Supported by:

```text
JWT
bcrypt
User Profile
Task CRUD
Search
Filtering
Analytics
Centralized Error Handling
```

> • Integrated an AI-powered assistant to generate personalized study plans, explain academic topics, and summarize study material.

Supported by:

```text
AI API
/api/ai/explain
/api/ai/study-plan
/api/ai/summarize
```

> • Deployed the application with a production-ready frontend and backend configuration.

Supported only after:

```text
Frontend Deployment
Backend Deployment
MongoDB Atlas
Environment Variables
Production Testing
```

---

# 15. FINAL PRINCIPLE

Build a **small, complete, reliable product** rather than a large unfinished application.

The final goal is:

```text
                COMPLETE
                   +
                DEPLOYED
                   +
                 POLISHED
                   +
             INTERVIEW-READY
```

not:

```text
50 features
+
20 unfinished features
+
broken deployment
```

**Finish the core. Test everything. Deploy it. Then improve it.**
