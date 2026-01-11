import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Link } from 'react-router-dom'

const Courses = () => {
const [courses, setCourses] = useState([])

const fetchCourses = async () => {
try {
const res = await axiosInstance.get('/courses')
setCourses(res.data)
} catch {
alert('Failed to load courses')
}
}

useEffect(() => {
fetchCourses()
}, [])

const enrollCourse = async (courseId) => {
try {
await axiosInstance.post(`/enrollments/${courseId}`)
alert('Enrolled successfully')
} catch (err) {
alert(err.response?.data?.message || 'Enroll failed')
}
}

const addFavourite = async (courseId) => {
try {
await axiosInstance.post(`/favourites/${courseId}`)
alert('Added to favourites')
} catch (err) {
alert(err.response?.data?.message || 'Failed to add favourite')
}
}

return (
<div className="container">
<h2>Courses</h2>

{courses.map((course) => (
<div className="card" key={course.course_id}>
<h3>
  <Link to={`/courses/${course.course_id}`}>
    {course.title}
  </Link>
</h3>
<p>{course.description}</p>
<p>Price: {course.price}</p>
<p>Level: {course.level}</p>

<div className="card-actions">
<button onClick={() => enrollCourse(course.course_id)}>
Enroll
</button>

<button onClick={() => addFavourite(course.course_id)}>
Add to Favourite
</button>
</div>
</div>
))}
</div>
)
}

export default Courses
