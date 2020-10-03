'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        static associate(models) {
            const { Users, Posts } = models
            Posts.belongsTo(Users, {
                foreignKey: {
                    name: 'user_id',
                    allowNull: false
                }
            })
        }
    }
    Posts.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'posts',
            sequelize,
            modelName: 'Posts'
        }
    )
    return Posts
}
