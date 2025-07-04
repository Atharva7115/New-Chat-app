# 💬 AI Chat App

A full-stack AI-powered chat application built with React, Node.js, and the OpenAI API. Users can chat with an intelligent assistant in real time, featuring secure authentication, message validation, and a modern, responsive UI.

---

## 🔗 Live Demo (if deployed)

[Visit the App](https://your-live-app-link.com) *(Update this with your actual link)*

---

 🛠️ Tech Stack

 🚀 Frontend (React + Vite + TypeScript)
- React 19, React Router DOM
- MUI (Material UI) for design
- Axios for API communication
- React Hot Toast for notifications
- React Type Animation & Icons
- Syntax Highlighting for messages

### 🔧 Backend (Node.js + Express + MongoDB)
- Express.js with REST API
- MongoDB with Mongoose
- Authentication using JWT & bcrypt
- Environment config with dotenv
- Validation with express-validator
- OpenAI API integration
- Morgan & cookie-parser for logging and sessions

---

 📁 Project Structure
chat-app/
├── backend/ # Express server with OpenAI integration
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints (auth, chat)
│ ├── controllers/ # Route handler logic
│ ├── middleware/ # Auth, error handling
│ ├── .env # API keys and DB config
│ └── index.ts # Server entry point
│
├── frontend/ # React frontend built with Vite
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Routes like Login, Chat
│ │ ├── services/ # API helpers (Axios)
│ │ └── App.tsx # App entry
│ └── vite.config.ts # Vite config
│
└── README.md # This file

✨ Features
🔐 User authentication with JWT

💬 Chat interface with AI assistant (OpenAI API)

🌐 Fully responsive design using MUI

✅ Form validation and protected routes

⚙️ RESTful APIs with Express and MongoDB

🛡️ Secure password handling with bcrypt

⚡ Toast notifications and typing effects

📦 Scripts
Backend

npm run dev     # Start server in development
npm run build   # Compile TypeScript
npm start       # Run compiled JavaScript

Frontend

npm run dev     # Start frontend dev server
npm run build   # Build for production
npm run preview # Preview production build


