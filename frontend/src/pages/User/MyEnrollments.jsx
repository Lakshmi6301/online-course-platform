import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'

const MyEnrollments = () => {
const [enrollments, setEnrollments] = useState([])

const fetchEnrollments = async () => {
try {
const res = await axiosInstance.get('/enrollments/my')
setEnrollments(res.data)
} catch {
alert('Failed to load enrollments')
}
}

useEffect(() => {
fetchEnrollments()
}, [])

return (
<div className="container">
<h2>My Enrollments</h2>

{enrollments.length === 0 && <p>No enrollments found</p>}

{enrollments.map((course) => (
<div className="card" key={course.course_id}>
<h3>{course.title}</h3>
<p>{course.description}</p>
<p>Price: {course.price}</p>
<p>Level: {course.level}</p>
</div>
))}
</div>
)
}

export default MyEnrollments
