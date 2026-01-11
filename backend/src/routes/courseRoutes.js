const express = require('express')
const checkAuth = require('../middleware/authMiddleware')
const { checkAdmin } = require('../middleware/roleMiddleware')
const {
createCourse,
getCourses,
getCourseById,
updateCourse,
deleteCourse
} = require('../controllers/courseController')

const router = express.Router()

router.post('/', checkAuth, checkAdmin, createCourse)
router.get('/', getCourses)
router.get('/:id', getCourseById)
router.put('/:id', checkAuth, checkAdmin, updateCourse)
router.delete('/:id', checkAuth, checkAdmin, deleteCourse)

module.exports = router
