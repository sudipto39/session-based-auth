# 🔐 Session-Based Authentication with Express & Redis

A backend capstone project implementing **session-based authentication** using **Node.js**, **Express.js**, and **Redis**.  
This project demonstrates how to build a **scalable, secure, production-ready authentication system** without using JWTs.

---

## 🚀 Features

- Session-based authentication
- Redis-backed session store
- Secure login & logout flow
- Manual user signup & login
- Server-side session invalidation
- Scalable for multi-instance deployments
- Clean, modular architecture

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Redis
- express-session
- connect-redis
- MongoDB + Mongoose
- bcrypt
- dotenv

---

## 📁 Project Structure

├── src/
│ ├── config/
│ │ ├── db.js
│ │ ├── redis.js
│ │ └── session.js
│ ├── controllers/
│ │ └── auth.controller.js
│ ├── models/
│ │ └── user.model.js
│ ├── routes/
│ │ └── auth.routes.js
│ ├── middlewares/
│ │ └── auth.middleware.js
│ ├── app.js
│ └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md

---

## 🔑 Authentication Flow

1. User registers with email & password
2. Password is hashed using bcrypt
3. On login:
   - Server creates a session
   - Session ID is stored in an HTTP-only cookie
   - Session data is stored in Redis
4. On logout:
   - Session is destroyed
   - Redis session entry is removed
   - Cookie is cleared

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

SESSION_SECRET=your_session_secret

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/session-auth-redis.git
cd session-auth-redis
```
2. Install dependencies
```
npm install
```

3. Start Redis server
```
redis-server
```

5. Run the application
```
npm run dev
```
Server runs at:
http://localhost:5000

🧪 API Endpoints
| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | /auth/register | Register a new user      |
| POST   | /auth/login    | Login user               |
| POST   | /auth/logout   | Logout user              |
| GET    | /auth/me       | Get current user session |

🔐 Security Practices
-HTTP-only cookies
-Secure cookies in production
-Redis TTL-based session expiration
-Session regeneration on login
-Centralized session configuration

📌 Future Enhancements
-CSRF protection
-Rate limiting
-OAuth (Google login)
-Role-based access control

🎯 Learning Outcomes
-Deep understanding of session-based authentication
-Redis as a distributed session store
-Express session lifecycle
-Scalable backend architecture

📜 License
MIT License

👨‍💻 Author
Sudipto Gayen
Backend Developer | Node.js | System Design Learner
