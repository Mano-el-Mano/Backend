'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Reservations extends Model {
        static associate(models) {
            const { Users, Reservations, Cars } = models
            Reservations.belongsTo(Users, {
                foreignKey: {
                    name: 'user_id',
                    allowNull: false
                }
            })
            Reservations.belongsTo(Cars, {
                foreignKey: {
                    name: 'car_id',
                    allowNull: false
                }
            })
        }
    }
    Reservations.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            starts: {
                allowNull: false,
                type: DataTypes.DATE
            },
            ends: {
                allowNull: false,
                type: DataTypes.DATE
            },
            resolved_at: {
                allowNull: true,
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'reservations',
            sequelize,
            modelName: 'Reservations'
        }
    )
    return Reservations
}
