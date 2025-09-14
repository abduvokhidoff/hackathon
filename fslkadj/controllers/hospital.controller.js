const hospitalService = require('../services/hospital.service')

exports.getAllHospitals = async (req, res, next) => {
	try {
		const hospitals = await hospitalService.getAll()
		res.json(hospitals)
	} catch (err) {
		next(err)
	}
}

exports.createHospital = async (req, res, next) => {
	try {
		const hospital = await hospitalService.create(req.body)
		res.status(201).json(hospital)
	} catch (err) {
		next(err)
	}
}

exports.getHospitalById = async (req, res, next) => {
	try {
		const hospital = await hospitalService.getById(req.params.id)
		if (!hospital)
			return res.status(404).json({ message: 'Hospital not found' })
		res.json(hospital)
	} catch (err) {
		next(err)
	}
}

exports.updateHospital = async (req, res, next) => {
	try {
		const updated = await hospitalService.update(req.params.id, req.body)
		if (!updated)
			return res.status(404).json({ message: 'Hospital not found for update' })
		res.json(updated)
	} catch (err) {
		next(err)
	}
}

exports.deleteHospital = async (req, res, next) => {
	try {
		const deleted = await hospitalService.remove(req.params.id)
		if (!deleted)
			return res
				.status(404)
				.json({ message: 'Hospital not found for deletion' })
		res.json({ message: 'Hospital deleted' })
	} catch (err) {
		next(err)
	}
}
