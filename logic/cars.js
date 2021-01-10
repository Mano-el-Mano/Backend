const moment = require('moment')
const db = require('../db/pg/models')

const { Cars } = db.models

module.exports = {
    createCar: async (model, brand, release) => {
        const { dataValues: car } = await Cars.create({
            model,
            brand,
            release: moment(release).toDate(),
            createAt: Date()
        })
        return car
    },
    getCarById: async id => {
        return Cars.findByPk(id)
    },
    getAll: async () => Cars.findAll()
}
