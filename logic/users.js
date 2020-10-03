const db = require('../db/pg/models')
const bcrypt = require('../auth/bcrypt')
const token = require('../auth/token')

const { Users } = db.models

module.exports = {
    signUp: async (email, password, name) => {
        const hash = await bcrypt.hash(password)
        try {
            const { dataValues: user } = await Users.create({
                email,
                password: hash,
                name,
                createAt: Date()
            })
            delete user.password

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
                throw new Error(e)
            }
        }
    },

    signIn: async (email, password) => {
        const res = await Users.findOne({
            where: {
                email
            }
        })
        console.log('res', res)
        if (
            res === null ||
            !(await bcrypt.compare(password, res.dataValues.password))
        ) {
            return {
                success: false
            }
        }
        const { dataValues: user } = res
        delete user.password

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
