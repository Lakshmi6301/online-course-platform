const pool = require('../config/db')

const addFavourite = async (req, res) => {
const userId = req.user.user_id
const { courseId } = req.params

try {
await pool.query(
'INSERT INTO favourites (user_id, course_id) VALUES ($1, $2)',
[userId, courseId]
)

res.status(201).json({ message: 'Added to favourites' })
} catch (err) {
if (err.code === '23505') {
return res.status(400).json({ message: 'Already in favourites' })
}
res.status(500).json({ message: 'Failed to add favourite' })
}
}

const removeFavourite = async (req, res) => {
const userId = req.user.user_id
const { courseId } = req.params

try {
await pool.query(
'DELETE FROM favourites WHERE user_id=$1 AND course_id=$2',
[userId, courseId]
)

res.json({ message: 'Removed from favourites' })
} catch {
res.status(500).json({ message: 'Failed to remove favourite' })
}
}

const getMyFavourites = async (req, res) => {
const userId = req.user.user_id

try {
const result = await pool.query(
`SELECT c.*
 FROM favourites f
 JOIN courses c ON f.course_id = c.course_id
 WHERE f.user_id = $1`,
[userId]
)

res.json(result.rows)
} catch {
res.status(500).json({ message: 'Failed to fetch favourites' })
}
}

module.exports = { addFavourite, removeFavourite, getMyFavourites }
