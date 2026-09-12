# StudyZen — AI-Powered Student Productivity Platform

StudyZen is a full-stack student productivity platform designed to help students manage academic tasks, deadlines, priorities, and study workflows, coupled with an AI assistant.

---

## Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **Environment Management:** dotenv

---

## Project Structure

```text
StudyZen/
├── client/          # React + Vite frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── server/          # Node.js + Express backend API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── roadmap.md       # 7-Day implementation roadmap & checklist
└── README.md
```

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas connection string)

### 2. Backend Setup
```bash
cd server
npm install
# Configure your environment variables in server/.env
npm run dev
```

The server runs by default on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The frontend runs by default on `http://localhost:5173`.

