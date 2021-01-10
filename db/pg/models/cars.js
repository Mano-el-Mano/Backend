'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Cars extends Model {}
    Cars.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            model: {
                allowNull: false,
                type: DataTypes.STRING
            },
            brand: {
                allowNull: false,
                type: DataTypes.STRING
            },
            release: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'cars',
            sequelize,
            modelName: 'Cars'
        }
    )
    return Cars
}
