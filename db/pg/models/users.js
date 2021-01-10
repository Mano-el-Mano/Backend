'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            const { Users, Reservations } = models
            Users.hasMany(Reservations, {
                foreignKey: {
                    name: 'user_id',
                    allowNull: false
                }
            })
        }
    }
    Users.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            p_hash: {
                allowNull: false,
                type: DataTypes.STRING
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'users',
            sequelize,
            modelName: 'Users'
        }
    )
    return Users
}
