const express = require('express')
const router = express.Router()
const users = require('../../../logiclayer/users')
const ResourceError = require('../../../errors/ResourceError')
const forwarder = require('../util/forwarder')

router.post(
    '/',
    forwarder(async (req, res, next) => {
        const { email, password, name } = req.body
        try {
            const data = await users.signUp(email, password, name)
            const { jwt, user } = data
            res.status(201).json({
                msg: 'successfully created user!',
                jwt,
                user
            })
        } catch (e) {
            next(new ResourceError(e.toString(), 500))
        }
    })
)

module.exports = router
