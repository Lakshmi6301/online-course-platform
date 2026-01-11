import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()
const { login } = useContext(AuthContext)

const handleSubmit = async (e) => {
e.preventDefault()

try {
const res = await axiosInstance.post('/auth/login', {
email,
password
})

login(res.data)

if (res.data.user.role === 'admin') {
navigate('/admin')
} else {
navigate('/courses')
}
} catch {
alert('Invalid credentials')
}
}

return (
<div className="container">
<h2>Login</h2>

<form onSubmit={handleSubmit}>
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

<button type="submit">Login</button>
</form>
</div>
)
}

export default Login
