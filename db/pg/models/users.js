'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            const { Users, Posts } = models
            Users.hasMany(Posts, {
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
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            password: {
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
