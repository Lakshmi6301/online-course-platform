const pool = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const register = async (req, res) => {
const errors = validationResult(req)
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() })
}

const { name, email, password, role } = req.body

if (role !== 'admin' && role !== 'student') {
return res.status(400).json({ message: 'Invalid role' })
}

try {
const hashedPassword = await bcrypt.hash(password, 10)

const result = await pool.query(
'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, name, role',
[name, email, hashedPassword, role]
)

res.status(201).json(result.rows[0])
} catch (err) {
res.status(400).json({ message: 'Email already exists' })
}
}

const login = async (req, res) => {
const errors = validationResult(req)
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() })
}

const { email, password } = req.body

try {
const result = await pool.query(
'SELECT * FROM users WHERE email = $1',
[email]
)

if (result.rows.length === 0) {
return res.status(400).json({ message: 'Invalid credentials' })
}

const user = result.rows[0]

const isMatch = await bcrypt.compare(password, user.password)

if (!isMatch) {
return res.status(400).json({ message: 'Invalid credentials' })
}

const token = jwt.sign(
{ user_id: user.user_id, role: user.role },
process.env.JWT_SECRET,
{ expiresIn: '1d' }
)

res.json({
token,
user: {
user_id: user.user_id,
name: user.name,
role: user.role
}
})
} catch {
res.status(500).json({ message: 'Server error' })
}
}

module.exports = { register, login }
