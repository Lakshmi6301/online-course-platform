import { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'

const AdminCourseForm = ({ course, onClose }) => {
const [title, setTitle] = useState(course.title || '')
const [description, setDescription] = useState(course.description || '')
const [price, setPrice] = useState(course.price || '')
const [level, setLevel] = useState(course.level || 'beginner')

const handleSubmit = async (e) => {
e.preventDefault()

const data = { title, description, price, level }

if (course.course_id) {
await axiosInstance.put(`/courses/${course.course_id}`, data)
} else {
await axiosInstance.post('/courses', data)
}

onClose()
}

return (
<form onSubmit={handleSubmit} className="admin-form">
<h3>{course.course_id ? 'Edit Course' : 'Add Course'}</h3>

<input
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>

<textarea
placeholder="Description"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>

<input
type="number"
placeholder="Price"
value={price}
onChange={(e) => setPrice(e.target.value)}
/>

<select value={level} onChange={(e) => setLevel(e.target.value)}>
<option value="beginner">Beginner</option>
<option value="intermediate">Intermediate</option>
<option value="advanced">Advanced</option>
</select>

<button type="submit">Save</button>
<button type="button" onClick={onClose}>Cancel</button>
</form>
)
}

export default AdminCourseForm
