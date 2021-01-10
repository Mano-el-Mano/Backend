const express = require('express')
const carRoutes = require('./cars')
const reservationRoutes = require('./reservations')

const router = express.Router()

router.use('/cars', carRoutes)
router.use('/reservations', reservationRoutes)

module.exports = router
