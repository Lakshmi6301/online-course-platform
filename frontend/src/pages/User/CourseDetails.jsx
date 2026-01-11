import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'

const CourseDetails = () => {
const { id } = useParams()
const [course, setCourse] = useState(null)

useEffect(() => {
const fetchCourse = async () => {
try {
const res = await axiosInstance.get(`/courses/${id}`)
setCourse(res.data)
} catch {
alert('Failed to load course details')
}
}

fetchCourse()
}, [id])

const enrollCourse = async () => {
try {
await axiosInstance.post(`/enrollments/${id}`)
alert('Enrolled successfully')
} catch (err) {
alert(err.response?.data?.message || 'Enroll failed')
}
}

const addFavourite = async () => {
try {
await axiosInstance.post(`/favourites/${id}`)
alert('Added to favourites')
} catch (err) {
alert(err.response?.data?.message || 'Failed to add favourite')
}
}

if (!course) {
return <p>Loading...</p>
}

return (
<div className="container">
<h2>{course.title}</h2>

<p>{course.description}</p>
<p>Price: {course.price}</p>
<p>Level: {course.level}</p>

<div className="card-actions">
<button onClick={enrollCourse}>
Enroll
</button>

<button onClick={addFavourite}>
Add to Favourite
</button>
</div>
</div>
)
}

export default CourseDetails
