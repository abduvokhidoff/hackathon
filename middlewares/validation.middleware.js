exports.validateUser = (req, res, next) => {
	const { name, phone, password, location } = req.body

	if (!name || !phone || !password || !location) {
		return res.status(400).json({ message: 'All fields are required' })
	}
	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: 'Password must be at least 6 characters long' })
	}

	next()
}
