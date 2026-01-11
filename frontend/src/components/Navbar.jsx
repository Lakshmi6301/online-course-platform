import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
const { user, logout } = useContext(AuthContext)
const navigate = useNavigate()

const handleLogout = () => {
logout()
navigate('/login')
}

return (
<div className="navbar">
<div className="nav-left">
<span className="brand">CoursePlatform</span>
</div>

<div className="nav-right">
{!user && (
<>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
</>
)}

{user && user.role === 'student' && (
<>
<Link to="/courses">Courses</Link>
<Link to="/my-enrollments">My Enrollments</Link>
<Link to="/my-favourites">My Favourites</Link>
<button onClick={handleLogout}>Logout</button>
</>
)}

{user && user.role === 'admin' && (
<>
<Link to="/admin">Admin Courses</Link>
<button onClick={handleLogout}>Logout</button>
</>
)}
</div>
</div>
)
}

export default Navbar
