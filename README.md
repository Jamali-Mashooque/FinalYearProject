# AI Career & Study Growth Platform

A full-stack MERN web application that helps students choose a career path and plan their studies with the help of AI. Final Year Project, University of Sindh, Jamshoro.

This repository contains the **React frontend**. The Node.js/Express API lives in [FinalYearProjectBackend](https://github.com/Jamali-Mashooque/FinalYearProjectBackend).

## Features

**Students**
- Register, set password via email link, and log in (JWT, protected routes)
- Build a profile with personal details, academic background and skills
- Take AI-generated skill assessments
- Get AI career recommendations based on profile and assessment results
- Follow step-by-step career roadmaps
- Plan learning with a personal study planner
- Chat with an AI Career Mentor (chat history, markdown and code highlighting)

**Admins**
- Dashboard overview of students and platform activity
- Manage careers, roadmaps and assessments (add, edit, view, delete)
- Review AI-generated recommendations and student details

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, React Router, Axios, React Markdown, Swiper |
| Backend | Node.js, Express.js, REST API, JWT, bcrypt, Nodemailer |
| Database | MongoDB, Mongoose |
| AI | Groq API (Llama 3.3 70B) |

## Getting Started

```bash
# 1. Backend
git clone https://github.com/Jamali-Mashooque/FinalYearProjectBackend.git
cd FinalYearProjectBackend
npm install
cp .env.example .env   # fill in your own values
npm run dev

# 2. Frontend
git clone https://github.com/Jamali-Mashooque/FinalYearProject.git
cd FinalYearProject
npm install
npm run dev            # http://localhost:5173
```

## Project Structure

```
src/
  api/          # Axios API clients (auth, admin, assessment, recommendation, planner, chat)
  component/
    pages/          # Home, About, Contact, Register, Login, Set Password
    Dashboard/      # Student dashboard: profile, recommendations, roadmap, study planner
    AdminDashboard/ # Admin: careers, roadmaps, assessments, students, AI recommendations
    AICareerMentor/ # AI chat interface
```
