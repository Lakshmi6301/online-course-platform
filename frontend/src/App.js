import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Navbar from './components/Navbar'
import Courses from './pages/User/Courses'
import CourseDetails from './pages/User/CourseDetails'
import MyEnrollments from './pages/User/MyEnrollments'
import MyFavourites from './pages/User/MyFavourites'
import AdminCourses from './pages/Admin/AdminCourses'

const App = () => {
return (
<AuthProvider>
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route
path="/admin"
element={
<ProtectedRoute role="admin">
<AdminCourses />
</ProtectedRoute>
}
/>

<Route
path="/courses"
element={
<ProtectedRoute role="student">
<Courses />
</ProtectedRoute>
}
/>

<Route
path="/courses/:id"
element={
<ProtectedRoute role="student">
<CourseDetails />
</ProtectedRoute>
}
/>

<Route
path="/my-enrollments"
element={
<ProtectedRoute role="student">
<MyEnrollments />
</ProtectedRoute>
}
/>

<Route
path="/my-favourites"
element={
<ProtectedRoute role="student">
<MyFavourites />
</ProtectedRoute>
}
/>
</Routes>
</BrowserRouter>
</AuthProvider>
)
}

export default App
