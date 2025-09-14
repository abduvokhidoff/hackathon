const authService = require('../services/auth.service')

exports.register = async (req, res, next) => {
	try {
		const { name, phone, password, location } = req.body
		const result = await authService.register({
			name,
			phone,
			password,
			location,
		})
		return res.status(201).json(result)
	} catch (err) {
		next(err)
	}
}

exports.login = async (req, res, next) => {
	try {
		const { phone, password } = req.body
		const result = await authService.login({ phone, password })
		return res.json(result)
	} catch (err) {
		next(err)
	}
}
