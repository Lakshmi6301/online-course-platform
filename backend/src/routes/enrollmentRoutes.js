const express = require('express')
const checkAuth = require('../middleware/authMiddleware')
const { checkStudent } = require('../middleware/roleMiddleware')
const {
enrollCourse,
getMyEnrollments
} = require('../controllers/enrollmentController')

const router = express.Router()

router.post('/:courseId', checkAuth, checkStudent, enrollCourse)
router.get('/my', checkAuth, checkStudent, getMyEnrollments)

module.exports = router
