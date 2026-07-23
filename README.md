# 🚀 CodeCelix User Panel (Full-Stack MERN Application)

A full-stack web application providing users with a comprehensive portal to register, log in, lodge complaints, submit feedback, manage profile details, and track submission history in real-time.

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose ORM (`db.js`)
- **Authentication:** JWT / Cookie-based Authentication (`auth.js`)
- **Environment Management:** `dotenv` (`.env`)

### **Frontend**
- **Framework:** React 18 (Vite)
- **Styling:** Custom Modular CSS (`Stylings/`)
- **State & HTTP:** Axios / Fetch API

---

## 📁 Repository Structure

```text
code_celix_user_panel/
├── backend/
│   ├── model/                  # Mongoose Schemas (User, Complaint, Feedback, etc.)
│   ├── routes/
│   │   ├── Complaint_Route.js  # Complaint filing & tracking APIs
│   │   ├── auth.js             # User registration & login endpoints
│   │   ├── feedback_route.js   # Feedback submission APIs
│   │   └── viewhistory.js      # User action & submission history APIs
│   ├── .env                    # Environment variables (DB URI, PORT, JWT Secret)
│   ├── db.js                   # MongoDB connection logic
│   ├── package.json
│   └── server.js               # Express server entry point
│
└── frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── Stylings/           # Section-specific styles
    │   │   ├── Complaint.css
    │   │   ├── Feedback.css
    │   │   ├── Styles.css
    │   │   └── viewhistory.css
    │   ├── components/         # Page components
    │   │   ├── complaint.jsx   # Complaint submission portal
    │   │   ├── feedback.jsx    # User feedback form
    │   │   ├── login.jsx       # User authentication
    │   │   ├── register.jsx    # User signup page
    │   │   ├── userprofile.jsx # Profile details view
    │   │   └── viewhistory.jsx # Submitted complaints & feedback history
    │   ├── App.css
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.html
    ├── eslint.config.js
    ├── package.json
    └── vite.config.js
