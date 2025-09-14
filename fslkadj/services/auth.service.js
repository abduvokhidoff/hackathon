const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const JWT_SECRET = process.env.JWT_SECRET || 'change_me_in_env'

exports.register = async ({ name, phone, password, location }) => {
	const existing = await User.findOne({ phone: phone })
	if (existing) {
		const err = new Error('You already registered')
		err.status = 409
		throw err
	}

	const saltRounds = 10
	const hash = await bcrypt.hash(password, saltRounds)

	const user = await User.create({ name, phone, password: hash, location })

	const token = jwt.sign({ sub: user._id, phone: user.phone }, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN,
	})

	return {
		token,
		user: {
			_id: user._id,
			name: user.name,
			phone: user.phone,
			location: user.location,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		},
	}
}

exports.login = async ({ phone, password }) => {
	const user = await User.findOne({ phone: phone }).select('+password')
	if (!user) {
		const err = new Error('Invalid credentials')
		err.status = 401
		throw err
	}
	const ok = await bcrypt.compare(password, user.password)
	if (!ok) {
		const err = new Error('Invalid credentials')
		err.status = 401
		throw err
	}
	const token = jwt.sign({ sub: user._id, phone: user.phone }, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN,
	})

	const u = user.toObject()
	delete u.password
	return { token, user: u }
}
