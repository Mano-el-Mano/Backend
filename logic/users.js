const db = require('../db/pg/models')
const bcrypt = require('../auth/bcrypt')
const token = require('../auth/token')
const ResourceError = require('../resources/errors/ResourceError')

const { Users } = db.models

module.exports = {
    signUp: async (email, password, name) => {
        const hash = await bcrypt.hash(password)
        try {
            const { dataValues: user } = await Users.create({
                email,
                p_hash: hash,
                name,
                createAt: Date()
            })
            delete user.p_hash

            const jwt = token.sign({
                id: user.id,
                name: user.name,
                email: user.email
            })
            return {
                success: true,
                jwt,
                user
            }
        } catch (e) {
            if (e.code === '23505') {
                return { success: false, user: null }
            } else {
                throw new ResourceError('Unaothorized', 401)
            }
        }
    },

    signIn: async (email, password) => {
        const res = await Users.findOne({
            where: {
                email
            }
        })
        if (
            res === null ||
            !(await bcrypt.compare(password, res.dataValues.p_hash))
        ) {
            throw new ResourceError('Unaothorized', 401)
        }
        const { dataValues: user } = res
        delete user.p_hash

        const jwt = token.sign({
            id: user.id,
            name: user.name,
            email: user.email
        })
        return {
            success: true,
            jwt,
            user
        }
    }
}
