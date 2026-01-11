const pool = require('../config/db')

const createCourse = async (req, res) => {
const { title, description, price, level } = req.body

try {
const result = await pool.query(
'INSERT INTO courses (title, description, price, level, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
[title, description, price, level, req.user.user_id]
)

res.status(201).json(result.rows[0])
} catch {
res.status(500).json({ message: 'Failed to create course' })
}
}

const getCourses = async (req, res) => {
const { search, level } = req.query

let query = 'SELECT * FROM courses WHERE 1=1'
let values = []

if (search) {
values.push(`%${search}%`)
query += ` AND title ILIKE $${values.length}`
}

if (level) {
values.push(level)
query += ` AND level = $${values.length}`
}

try {
const result = await pool.query(query, values)
res.json(result.rows)
} catch {
res.status(500).json({ message: 'Failed to fetch courses' })
}
}

const getCourseById = async (req, res) => {
const { id } = req.params

try {
const result = await pool.query(
'SELECT * FROM courses WHERE course_id = $1',
[id]
)

if (result.rows.length === 0) {
return res.status(404).json({ message: 'Course not found' })
}

res.json(result.rows[0])
} catch {
res.status(500).json({ message: 'Failed to fetch course' })
}
}

const updateCourse = async (req, res) => {
const { id } = req.params
const { title, description, price, level } = req.body

try {
const result = await pool.query(
'UPDATE courses SET title=$1, description=$2, price=$3, level=$4 WHERE course_id=$5 RETURNING *',
[title, description, price, level, id]
)

if (result.rows.length === 0) {
return res.status(404).json({ message: 'Course not found' })
}

res.json(result.rows[0])
} catch {
res.status(500).json({ message: 'Failed to update course' })
}
}

const deleteCourse = async (req, res) => {
const { id } = req.params

try {
const result = await pool.query(
'DELETE FROM courses WHERE course_id=$1 RETURNING *',
[id]
)

if (result.rows.length === 0) {
return res.status(404).json({ message: 'Course not found' })
}

res.json({ message: 'Course deleted' })
} catch {
res.status(500).json({ message: 'Failed to delete course' })
}
}

module.exports = {
createCourse,
getCourses,
getCourseById,
updateCourse,
deleteCourse
}
