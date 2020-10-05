const db = require('../db/pg/models')

const { Posts } = db.models

module.exports = {
    createpost: async (userId, content) => {
        const { dataValues: post } = await Posts.create({
            user_id: userId,
            content,
            createAt: Date()
        })
        return post
    }
}
