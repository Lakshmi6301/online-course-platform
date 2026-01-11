const checkAdmin = (req, res, next) => {
if (req.user.role !== 'admin') {
return res.status(403).json({ message: 'Admin access required' })
}
next()
}

const checkStudent = (req, res, next) => {
if (req.user.role !== 'student') {
return res.status(403).json({ message: 'Student access required' })
}
next()
}

module.exports = { checkAdmin, checkStudent }
