const express = require('express')
const checkAuth = require('../middleware/authMiddleware')
const { checkStudent } = require('../middleware/roleMiddleware')
const {
addFavourite,
removeFavourite,
getMyFavourites
} = require('../controllers/favouriteController')

const router = express.Router()

router.post('/:courseId', checkAuth, checkStudent, addFavourite)
router.delete('/:courseId', checkAuth, checkStudent, removeFavourite)
router.get('/my', checkAuth, checkStudent, getMyFavourites)

module.exports = router
