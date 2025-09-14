const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.routes')
const hospitalRoutes = require('./routes/hospital.route')
const authRoutes = require('./routes/auth.routes')
const errorHandler = require('./middlewares/error.middleware')

// Load env variables
dotenv.config()

// Init express
const app = express()

// Middleware
app.use(express.json())
const cors = require('cors')
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/hospitals', hospitalRoutes) // Fixed hospital route

// Error handler
app.use(errorHandler)

// MongoDB connect and run server
const PORT = process.env.PORT || 5000

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB connected')
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	})
	.catch(err => {
		console.error('Database connection error', err)
	})
