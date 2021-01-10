const express = require('express')
const router = express.Router()
const reservations = require('../../../logic/reservations')
const ResourceError = require('../../errors/ResourceError')
const enableExceptionHandler = require('../../util/enableExceptionHandler')

router.post(
    '/',
    enableExceptionHandler(async (req, res, next) => {
        try {
            const { starts, ends, userId, carId } = req.body
            const reservation = await reservations.createReservation(
                starts,
                ends,
                userId,
                carId
            )
            res.status(201).json(reservation)
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
            const reservation = await reservations.getReservationById(id)
            res.status(200).json(reservation)
        } catch (e) {
            next(new ResourceError(e.toString(), 500))
        }
    })
)

router.get(
    '/',
    enableExceptionHandler(async (req, res, next) => {
        try {
            const allReservations = await reservations.getAll()
            res.status(200).json(allReservations)
        } catch (e) {
            next(new ResourceError(e.toString(), 500))
        }
    })
)

module.exports = router
