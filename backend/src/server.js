const app = require('./app')
const pool = require('./config/db')

const PORT = process.env.PORT || 5000

pool.query('SELECT NOW()', (err, result) => {
if (err) {
console.error('Database connection failed')
process.exit(1)
}
console.log('Database connected')
})

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
