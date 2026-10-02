# PrepBS

> **A personalized study management system for students.**

PrepBS is a full-stack study-management application designed to help students organize their preparation, track study sessions, monitor progress, and build consistent study habits.

It combines **personalized planning, focused study sessions, preparation tracking, and performance data** into one platform.

---

## 🚀 What is PrepBS?

Students often use separate tools for:

* Planning what to study
* Tracking study time
* Managing exams
* Setting daily targets
* Monitoring preparation
* Revising weak topics

PrepBS aims to bring these systems together.

The application collects a student's preparation information during onboarding and uses it to create a personalized study environment.

---

## ✨ Current Features

### 🔐 Authentication

* User registration
* User login
* Password hashing with `bcryptjs`
* JWT-based authentication
* Protected backend routes
* Token persistence using `localStorage`
* Automatic user authentication through the `Authorization` header

### 🧭 Personalized Onboarding

Students provide their preparation information through a multi-step onboarding flow.

Current onboarding data includes:

* Exam category
* Exam
* Exam date
* Selected subject(s)
* Preparation level
* Daily study hours

The data is stored in MongoDB and connected to the authenticated user.

### 📊 Dashboard

The dashboard provides personalized information such as:

* Target examination
* Exam category
* Exam date
* Days remaining
* Selected subjects
* Preparation level
* Daily study target
* Study progress

### ⏱️ Study Clock

PrepBS includes a study-session system with multiple modes:

| Mode       |   Study |  Break |
| ---------- | ------: | -----: |
| Pomodoro   | 25 min* |  5 min |
| Focus      |  50 min | 10 min |
| Deep Focus |  90 min | 15 min |

*The Pomodoro duration may be temporarily shortened during development/testing.

Completed study sessions are sent to the backend and stored in MongoDB.

The dashboard can retrieve today's total study time, allowing daily progress to persist after refreshing the application.

---

## 🏗️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS

### Development

* VS Code
* Git
* GitHub
* MongoDB

---

## 🧠 System Architecture

```text
                   ┌─────────────────────┐
                   │       Student       │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │   React Frontend    │
                   │       Vite          │
                   └──────────┬──────────┘
                              │
                 HTTP Requests + JWT
                              │
                              ▼
                   ┌─────────────────────┐
                   │   Express Backend   │
                   │      Node.js        │
                   └──────────┬──────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐    ┌────────────┐   ┌─────────────┐
        │   Auth   │    │ Onboarding │   │ Study       │
        │   API    │    │    API     │   │ Sessions API│
        └────┬─────┘    └─────┬──────┘   └──────┬──────┘
             │                │                  │
             └────────────────┼──────────────────┘
                              ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    └──────────────────┘
```

---

## 🔐 Authentication Flow

PrepBS uses **JWT authentication with Bearer tokens**.

```text
Register
   ↓
Password hashed with bcryptjs
   ↓
User stored in MongoDB
   ↓
Login
   ↓
JWT generated
   ↓
Token stored in localStorage
   ↓
Frontend sends:
Authorization: Bearer <token>
   ↓
Express authentication middleware
   ↓
JWT verified
   ↓
User identified
   ↓
Protected API accessed
```

The backend does not trust the frontend to identify the user. Protected routes obtain the user identity from the verified JWT.

---

## 📚 Onboarding Flow

```text
Register / Login
       ↓
   Onboarding
       ↓
Exam Category
       ↓
     Exam
       ↓
   Exam Date
       ↓
    Subject
       ↓
Preparation Level
       ↓
Daily Study Hours
       ↓
     Dashboard
```

The onboarding information becomes the foundation for the student's personalized study environment.

---

## ⏱️ Study Session Architecture

When a student completes a study session:

```text
Study Clock
     ↓
Session Completed
     ↓
POST /api/study-sessions
     ↓
JWT Authentication
     ↓
Study Session Controller
     ↓
MongoDB
     ↓
Today's Study Time
     ↓
Dashboard Progress
```

This allows study-time data to survive page refreshes instead of existing only in React state.

---

## 📁 Project Structure

```text
PrepBS/
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   └── Dashboard/
│   │   │       ├── dashboard.jsx
│   │   │       ├── dashboard.css
│   │   │       └── StudyClock.jsx
│   │   │
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   │   ├── loginUser.jsx
│   │   │   │   └── registerUser.jsx
│   │   │   │
│   │   │   └── Onboarding/
│   │   │       ├── category/
│   │   │       ├── exam/
│   │   │       ├── date/
│   │   │       ├── subject/
│   │   │       ├── level/
│   │   │       └── dailyStudyHours/
│   │   │
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── onboarding.controller.js
│   │   └── studySession.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── onboarding.model.js
│   │   └── studySession.model.js
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── onboarding.route.js
│   │   └── studySession.route.js
│   │
│   ├── app.js
│   └── package.json
│
└── README.md
```

> The exact folder structure may change as PrepBS develops.

---

## 🔌 API Structure

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Onboarding

```text
POST /api/onboarding
GET  /api/onboarding/me
```

### Study Sessions

```text
POST /api/study-sessions
GET  /api/study-sessions/today
```

Protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Labrez-2010/PrepBS.git

cd PrepBS
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the backend directory.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do **not** commit your `.env` file to GitHub.

### 5. Start the backend

```bash
npm start
```

### 6. Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The Vite development server will provide the frontend URL.

---

## 🔄 Data Flow

A simplified example of how user data moves through PrepBS:

```text
Student
   │
   ▼
React UI
   │
   │ HTTP request
   ▼
Express API
   │
   ▼
Authentication Middleware
   │
   ▼
Controller
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
```

For protected requests, the JWT is verified before the controller accesses user-specific data.

---

## 🛣️ Roadmap

PrepBS is still under active development.

Planned improvements include:

* [ ] Better dashboard UI
* [ ] Subject/topic planning
* [ ] Daily and weekly study plans
* [ ] Topic completion tracking
* [ ] Practice-question tracking
* [ ] Revision-needed topics
* [ ] Performance analytics
* [ ] Study streaks
* [ ] Exam/Olympiad preparation mode
* [ ] Personalized recommendations
* [ ] More detailed study statistics
* [ ] Mobile-friendly experience
* [ ] Production deployment
* [ ] Improved authentication/session handling
* [ ] Automated testing

---

## 🎯 Long-Term Vision

PrepBS is intended to evolve from a simple study tracker into a **personalized StudyOS for students**.

The long-term system can connect:

```text
Student Profile
      +
Exam Information
      +
Study Plan
      +
Study Sessions
      +
Practice Performance
      +
Revision Data
      ↓
Personalized Study System
```

The goal is not simply to record how long a student studies, but to help answer:

* What should I study?
* What should I revise?
* Where am I weak?
* How much time do I have?
* Am I actually progressing?
* What should I focus on next?

---

## 🤝 Contributing

PrepBS is intended to be an open-source project.

Contributions, issues, feature ideas, and improvements are welcome.

Basic workflow:

```bash
git checkout -b feature/your-feature

git add .

git commit -m "Add your feature"

git push origin feature/your-feature
```

Then open a Pull Request on GitHub.

---

## 📄 License

MIT

---

## 👨‍💻 Author

**Labrez Shaikh**

Building PrepBS as an open-source student-focused study management platform.

GitHub: `Labrez-2010`
