# Online Course Platform (MERN + PostgreSQL)

A full-stack **Online Course Platform** built using the **MERN stack with PostgreSQL**, featuring **role-based authentication** and separate **Admin** and **Student** portals.


##  Features

### Authentication & Authorization
- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access control (Admin / Student)

---

###  Admin Portal
- Admin registration and login
- Create new courses
- View all courses
- Update course details
- Delete courses

---

### Student Portal
- Student registration and login
- Browse available courses
- View course details
- Enroll in courses
- Add/remove courses from favourites
- View enrolled courses
- View favourite courses

---

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Plain CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- express-validator (basic validation)

### Database
- PostgreSQL
- pg (node-postgres)

## Project Structure

### Backend

backend/
│── src/
│ ├── config/
│ │ └── db.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── roleMiddleware.js
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── courseController.js
│ │ ├── enrollmentController.js
│ │ └── favouriteController.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── courseRoutes.js
│ │ ├── enrollmentRoutes.js
│ │ └── favouriteRoutes.js
│ ├── app.js
│ └── server.js
│── package.json


### Frontend

frontend/
│── src/
│ ├── pages/
│ │ ├── Auth/
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ ├── Admin/
│ │ │ ├── AdminCourses.jsx
│ │ │ └── AdminCourseForm.jsx
│ │ ├── User/
│ │ │ ├── Courses.jsx
│ │ │ ├── CourseDetails.jsx
│ │ │ ├── MyEnrollments.jsx
│ │ │ └── MyFavourites.jsx
│ ├── components/
│ │ ├── Navbar.jsx
│ │ └── ProtectedRoute.jsx
│ ├── api/
│ │ └── axiosInstance.js
│ ├── context/
│ │ └── AuthContext.js
│ ├── App.js
│ └── index.js
│── package.json


## Database Schema

### Users
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Courses

CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  level VARCHAR(20) DEFAULT 'beginner',
  created_by INT REFERENCES users(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Enrollments

CREATE TABLE enrollments (
  enrollment_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);

Enrollments

CREATE TABLE enrollments (
  enrollment_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);

API Endpoints

Auth

POST /api/auth/register
POST /api/auth/login

Courses

GET /api/courses
GET /api/courses/:id
POST /api/courses (Admin)
PUT /api/courses/:id (Admin)
DELETE /api/courses/:id (Admin)

Enrollments

POST /api/enrollments/:courseId
GET /api/enrollments/my

Favourites

POST /api/favourites/:courseId
DELETE /api/favourites/:courseId
GET /api/favourites/my

Running the Project Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start

Status

All required features implemented
Role-based authentication working
Admin and Student flows complete
UI clean and functional

Author

Lakshmi
Full-Stack Developer (MERN)

