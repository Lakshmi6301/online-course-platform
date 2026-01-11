const pool = require('../config/db')

const enrollCourse = async (req, res) => {
const userId = req.user.user_id
const { courseId } = req.params

try {
await pool.query(
'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)',
[userId, courseId]
)

res.status(201).json({ message: 'Enrolled successfully' })
} catch (err) {
if (err.code === '23505') {
return res.status(400).json({ message: 'Already enrolled' })
}
res.status(500).json({ message: 'Enrollment failed' })
}
}

const getMyEnrollments = async (req, res) => {
const userId = req.user.user_id

try {
const result = await pool.query(
`SELECT c.*
 FROM enrollments e
 JOIN courses c ON e.course_id = c.course_id
 WHERE e.user_id = $1`,
[userId]
)

res.json(result.rows)
} catch {
res.status(500).json({ message: 'Failed to fetch enrollments' })
}
}

module.exports = { enrollCourse, getMyEnrollments }
