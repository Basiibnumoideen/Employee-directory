# 🧑‍💼 Employee Directory

A full-stack **Employee Directory** application built using:

- **Backend:** Node.js, GraphQL (Apollo Server), MongoDB (Native Driver)
- **Frontend:** Next.js with Apollo Client, Tailwind CSS
- **Deployment:** Backend on **Render**, Frontend on **Vercel**

---

## 🚀 Features

- ✅ Add, delete, and view employees
- ✅ Real-time updates with GraphQL
- ✅ WhatsApp integration for contact form (manual bot trigger)
- ✅ Styled with Tailwind CSS
- ✅ Full backend/frontend separation and deployment

---

## 🛠️ Tech Stack

| Layer     | Tech                              |
|-----------|-----------------------------------|
| Frontend  | Next.js, Apollo Client, Tailwind CSS |
| Backend   | Node.js, GraphQL (Apollo Server)  |
| Database  | MongoDB (without Mongoose)        |
| Hosting   | Vercel (Frontend) + Render (Backend) |

---

## 🌐 Live Demo

- **Frontend (Vercel):** [https://employee-directory-olive.vercel.app](https://employee-directory-olive.vercel.app)
- **Backend (Render):** [https://employee-directory-9fnq.onrender.com](https://employee-directory-9fnq.onrender.com)

---


---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/employee-directory.git
cd employee-directory
```
### 2. Backend Setup
```bash
cd backend
npm install
# Add your MongoDB URI to .env
node index.js
```

### 3.  Frontend Setup
```bash
cd ../frontend
npm install
# Create .env.local with:
# NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000
npm run dev
```
## 🔐 Environment Variables
### 1.  Backend (backend/.env)
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=4000
CORS_ORIGIN=https://employee-directory-olive.vercel.app

```
### 2.  Frontend (frontend/.env.local)
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000

## 📦 Deployment
Backend: Deployed to Render with environment variables configured

Frontend: Deployed to Vercel, with NEXT_PUBLIC_GRAPHQL_ENDPOINT set to backend URL

## 🙋‍♂️ Author
Muhammed Abdul Basith 

- portfolio  : https://portfolio-tau-roan-46.vercel.app/

- Email      : basiibnumoideen@gmail.com

- LinkedIn   : www.linkedin.com/in/basiibnumoideen2003
