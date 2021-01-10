const express = require('express')
const router = express.Router()
const cars = require('../../../logic/cars')
const ResourceError = require('../../errors/ResourceError')
const enableExceptionHandler = require('../../util/enableExceptionHandler')

router.post(
    '/',
    enableExceptionHandler(async (req, res, next) => {
        try {
            const { model, brand, release } = req.body
            console.log(req.bodys)
            const car = await cars.createCar(model, brand, release)
            res.status(201).json(car)
        } catch (e) {
            next(new ResourceError(e.toString(), 500))
        }
    })
)

router.get(
    '/:id',
    enableExceptionHandler(async (req, res, next) => {
        const { id } = req.params
        try {
            const car = await cars.getCarById(id)
            res.status(200).json(car)
        } catch (e) {
            next(new ResourceError(e.toString(), 500))
        }
    })
)

router.get(
    '/',
    enableExceptionHandler(async (req, res, next) => {
        try {
            const allCars = await cars.getAll()
            console.log('cars')
            res.status(200).json(allCars)
        } catch (e) {
            next(new ResourceError(e.toString(), 500))
        }
    })
)

module.exports = router
