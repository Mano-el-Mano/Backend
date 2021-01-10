const moment = require('moment')
const db = require('../db/pg/models')

const { Reservations } = db.models

module.exports = {
    createReservation: async (starts, ends, userId, carId) => {
        const { dataValues: reservation } = await Reservations.create({
            user_id: userId,
            car_id: carId,
            starts: moment(starts).toDate(),
            ends: moment(ends).toDate(),
            createAt: Date()
        })
        return reservation
    },
    getReservationById: async id => {
        return Reservations.findByPk(id)
    },
    getAll: async () => Reservations.findAll()
}
