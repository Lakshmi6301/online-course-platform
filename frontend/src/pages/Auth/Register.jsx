import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'

const Register = () => {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [role, setRole] = useState('student')
const navigate = useNavigate()

const handleSubmit = async (e) => {
e.preventDefault()

try {
await axiosInstance.post('/auth/register', {
name,
email,
password,
role
})

alert('Registration successful')
navigate('/login')
} catch {
alert('Registration failed')
}
}

return (
<div className="container">
<h2>Register</h2>

<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>

<select value={role} onChange={(e) => setRole(e.target.value)}>
<option value="student">Student</option>
<option value="admin">Admin</option>
</select>

<button type="submit">Register</button>
</form>
</div>
)
}

export default Register
