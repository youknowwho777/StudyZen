# StudyZen — Full-Stack Learning Guide (Phases 0 to 4)

This guide outlines the optimal, step-by-step learning order to understand how everything in this codebase works, from server foundations to interactive analytics.

---

## 🗺️ Recommended Learning Roadmap

```text
Step 1: Architecture & Server Foundation (Phase 0)
   ↓
Step 2: Database & Mongoose Data Modeling (Phase 0, 1, 3)
   ↓
Step 3: Authentication, Password Hashing & JWTs (Phase 1)
   ↓
Step 4: UI Shell, Navigation & Dual Themes (Phase 2)
   ↓
Step 5: End-to-End Task CRUD & Data Ownership (Phase 3)
   ↓
Step 6: Data Aggregation & Productivity Analytics (Phase 4)
```

---

## Step 1: Project Architecture & Server Foundation (Phase 0)
**Concept:** Understanding how the frontend, backend, and environment variables communicate.

1. **Read `server/server.js` & `server/app.js`**:
   - How Express boots on port 5000.
   - How CORS allows `http://localhost:5173` to make API calls without being blocked by the browser.
2. **Read `client/src/services/api.js`**:
   - How Axios creates a centralized HTTP client reading `VITE_API_URL`.
3. **Read `server/routes/healthRoutes.js`**:
   - The simplest endpoint (`GET /api/health`) to test that frontend and backend can talk to each other.

---

## Step 2: Database & Mongoose Schemas (Phases 0, 1, 3)
**Concept:** How MongoDB stores documents and how Mongoose enforces data structure.

1. **Read `server/config/db.js`**:
   - How Mongoose establishes a connection with MongoDB Atlas using `process.env.MONGO_URI`.
   - Event listeners for `disconnected` and `reconnected`.
2. **Read `server/models/User.js`**:
   - Schema fields: `name`, `email`, `password`, and sub-document `profile`.
   - The Mongoose `pre('save')` hook: automatically hashing passwords with `bcryptjs` before writing to disk.
3. **Read `server/models/Task.js`**:
   - How tasks reference a user using `mongoose.Schema.Types.ObjectId` (`ref: 'User'`).
   - Enum validation for `priority` and `status`.

---

## Step 3: Authentication, JWT & Security (Phase 1)
**Concept:** How users securely log in, receive a digital passport (JWT), and access protected routes.

1. **Read `server/utils/generateToken.js` & `server/controllers/authController.js`**:
   - How `jwt.sign()` generates a signed token containing the user's ID.
   - Password verification using `user.matchPassword(enteredPassword)` (`bcrypt.compare`).
2. **Read `server/middleware/authMiddleware.js`**:
   - How `protect` checks the `Authorization: Bearer <token>` header, verifies the signature, and attaches `req.user`.
3. **Read `client/src/context/AuthContext.jsx`**:
   - How React Context stores `user` and `token` in `localStorage` so you stay logged in after refreshing the page.
4. **Read `client/src/components/ProtectedRoute.jsx` & `PublicRoute.jsx`**:
   - How React Router redirects logged-out users to `/login`, and logged-in users away from `/login` to `/dashboard`.

---

## Step 4: UI Shell, Navigation & Themes (Phase 2)
**Concept:** Building a responsive student dashboard shell with Light and Dark mode.

1. **Read `client/src/context/ThemeContext.jsx` & `client/src/index.css`**:
   - How toggling the `'dark'` class on `document.documentElement` controls Tailwind CSS styles.
2. **Read `client/src/components/Sidebar.jsx` & `Navbar.jsx`**:
   - Active route detection using React Router's `NavLink` and `useLocation()`.
   - Mobile slide-out drawer behavior with backdrop blur.
3. **Read `client/src/components/StatCard.jsx` & `EmptyState.jsx`**:
   - Creating reusable, modular UI components that accept props.

---

## Step 5: Full Task CRUD & Ownership Isolation (Phase 3)
**Concept:** Creating, reading, updating, and deleting records with strict user security.

1. **Read `server/controllers/taskController.js`**:
   - **Ownership Isolation:** Notice how `getTasks` strictly queries `{ user: req.user._id }`.
   - Notice how `updateTask` and `deleteTask` verify `task.user.toString() === req.user._id.toString()`.
2. **Read `client/src/services/taskService.js`**:
   - Clean API abstraction layer for task calls.
3. **Read `client/src/components/TaskModal.jsx`**:
   - Controlled React form handling both "Create" and "Edit" modes.
4. **Read `client/src/pages/Tasks.jsx`**:
   - Client-side search and filtering using React's `useMemo()`.
   - Optimistic UI updates (instantly checking off a task before the API responds).

---

## Step 6: Data Aggregation & Real-Time Analytics (Phase 4)
**Concept:** Converting raw database records into actionable metrics.

1. **Read `getTaskStats` in `server/controllers/taskController.js`**:
   - How total, completed, pending, and overdue tasks are calculated.
   - **Golden Rule:** Safe division preventing `NaN` or zero-division errors (`total > 0 ? (completed / total) * 100 : 0`).
   - Grouping tasks by subject category and priority.
2. **Read `client/src/pages/Analytics.jsx`**:
   - Visual progress bars, priority distribution, and academic performance grading.
3. **Read `client/src/pages/Dashboard.jsx`**:
   - Replacing dummy mock data with live MongoDB data using `Promise.allSettled()`.

---

## 🎯 Quick Self-Check Questions
* Can you explain why the password must never be stored as plain text? *(See `User.js`)*
* What does the JWT payload contain and why don't we store passwords in it? *(See `generateToken.js`)*
* Why is it critical to check `task.user.toString() === req.user._id.toString()` on delete? *(See `taskController.js`)*
* How does `localStorage` keep the student logged in after closing the browser? *(See `AuthContext.jsx`)*
