import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import AdminCourseForm from './AdminCourseForm'

const AdminCourses = () => {
const [courses, setCourses] = useState([])
const [selectedCourse, setSelectedCourse] = useState(null)

const fetchCourses = async () => {
const res = await axiosInstance.get('/courses')
setCourses(res.data)
}

useEffect(() => {
fetchCourses()
}, [])

const deleteCourse = async (id) => {
await axiosInstance.delete(`/courses/${id}`)
fetchCourses()
}

return (
<div className="container">
<div className="admin-header">
<h2>Admin Courses</h2>
<button onClick={() => setSelectedCourse({})}>
Add Course
</button>
</div>

{selectedCourse && (
<AdminCourseForm
course={selectedCourse}
onClose={() => {
setSelectedCourse(null)
fetchCourses()
}}
/>
)}

{courses.map(course => (
<div className="card" key={course.course_id}>
<h3>{course.title}</h3>
<p>{course.description}</p>
<p>Price: {course.price}</p>
<p>Level: {course.level}</p>

<div className="card-actions">
<button onClick={() => setSelectedCourse(course)}>
Edit
</button>

<button onClick={() => deleteCourse(course.course_id)}>
Delete
</button>
</div>
</div>
))}
</div>
)
}

export default AdminCourses
