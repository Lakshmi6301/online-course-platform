import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'

const MyFavourites = () => {
const [favourites, setFavourites] = useState([])

const fetchFavourites = async () => {
try {
const res = await axiosInstance.get('/favourites/my')
setFavourites(res.data)
} catch {
alert('Failed to load favourites')
}
}

useEffect(() => {
fetchFavourites()
}, [])

const removeFavourite = async (courseId) => {
try {
await axiosInstance.delete(`/favourites/${courseId}`)
setFavourites(favourites.filter(c => c.course_id !== courseId))
} catch {
alert('Failed to remove favourite')
}
}

return (
<div className="container">
<h2>My Favourites</h2>

{favourites.length === 0 && <p>No favourites found</p>}

{favourites.map((course) => (
<div className="card" key={course.course_id}>
<h3>{course.title}</h3>
<p>{course.description}</p>
<p>Price: {course.price}</p>
<p>Level: {course.level}</p>

<div className="card-actions">
<button onClick={() => removeFavourite(course.course_id)}>
Remove
</button>
</div>
</div>
))}
</div>
)
}

export default MyFavourites
