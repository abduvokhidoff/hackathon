const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		specialty: { type: String },
		bemorlar: [
			{
				patientId: { type: String, required: true },
				name: { type: String, required: true },
				age: { type: Number },
				phone: { type: NamedNodeMapumber },
				address: { type: String },
			},
		],
		ish_vaqti: {
			start: { type: Number, required: true }, // Start time in minutes (e.g., 540 for 9:00 AM)
			end: { type: Number, required: true }, // End time in minutes (e.g., 1020 for 5:00 PM)
		},
		ish_kunlari: { type: [String], required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Hospital', hospitalSchema)
