const Hospital = require('../models/hospital.model')

exports.getAll = () => Hospital.find()

exports.create = data => Hospital.create(data)

exports.getById = id => Hospital.findById(id)

exports.update = (id, data) =>
	Hospital.findByIdAndUpdate(id, data, { new: true })

exports.remove = id => Hospital.findByIdAndDelete(id)
