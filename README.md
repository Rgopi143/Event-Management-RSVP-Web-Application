z

# 🎉 EventSphere - Event Management & RSVP Web Application

Welcome to *EventSphere, a full-stack web application that allows users to create, manage, and RSVP to public and private events. Built as part of the **IBI Web Development Internship*, this app simplifies event planning and participation—think of it as a mini-Eventbrite!

---

## 🌐 Live Demo

🔗[Frontend (Netlify)](https://event-management-and-rsvp-web-apk.netlify.app/)   
🔗 [Backend (Render)](https://youreventapp-api.onrender.com)  
📹 [Demo Video Walkthrough](https://your-demo-video-link.com)

---

## 📌 Features

### 👤 Authentication (JWT-based)
- Secure Sign Up & Login
- Role-based views (Host vs Guest)

### 📅 Event Management
- Create/Edit/Delete events
- Event fields: title, description, date, location, capacity, type
- Host Dashboard for "My Events"

### 🙋 RSVP Functionality
- Public event listings
- RSVP to events
- RSVP status tracking (Pending/Confirmed/Declined)

### 📧 Email Notifications
- RSVP confirmation
- Event reminders using Nodemailer

---

## 🌟 Bonus Features (Optional)
- QR code for event check-in
- Export attendee list as CSV
- Upload event images
- Admin analytics dashboard (event-wise stats)

---

## 🧱 Tech Stack

| Frontend        | Backend         | Database   | Other Tools       |
|-----------------|------------------|------------|-------------------|
| React.js        | Node.js + Express| PostgreSQL | Tailwind CSS      |
| Axios           | JWT Auth         | Sequelize  | Nodemailer, Vercel|
| React Router    |                  |            | Render, Loom      |

---

## 🗂 Folder Structure

event-management-app/ │ ├── client/       # React Frontend │   ├── src/ │   │   ├── pages/ │   │   ├── components/ │   │   └── App.js │   └── tailwind.config.js │ ├── server/       # Express Backend │   ├── controllers/ │   ├── models/ │   ├── routes/ │   ├── middleware/ │   └── server.js │ └── README.md

---

## 🛠 Installation & Setup

### 🖥 Backend Setup

```bash
cd server
npm install
# Set up PostgreSQL DB and .env variables
npm start

🌐 Frontend Setup

cd client
npm install
npm run dev


---

🗄 Database Schema

Users Table

id | name | email | password_hash | role

Events Table

id | host_id | title | date | location | capacity | description

RSVPs Table

id | user_id | event_id | status


---

🎥 Demo Video

A 5-minute walkthrough is available here:
🎬 Watch Now


---

📧 Contact

Created by: [Your Name]
📩 Email: your.email@example.com
🔗 GitHub: github.com/yourusername


---

> This project was developed for InfoBharat Interns (IBI) as part of the July–August 2025 Web Development Internship.



---

Let me know if you'd like it:
- Tailored to your name/GitHub
- Downloaded as a .md file
- Converted into a PDF

Or if you want help writing the actual *demo script* or setting up deployment.
