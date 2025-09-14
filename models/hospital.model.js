const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		location: { type: String, required: true },
		services: [{ type: String }],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Hospital', hospitalSchema)
