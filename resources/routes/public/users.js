const express = require('express')
const router = express.Router()
const users = require('../../../logic/users')
const ResourceError = require('../../errors/ResourceError')
const enableExceptionHandler = require('../../util/enableExceptionHandler')

router.post(
    '/sign-up',
    enableExceptionHandler(async (req, res, next) => {
        try {
            //checks if they exist
            const { email, password, name } = req.body
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

router.post(
    '/sign-in',
    enableExceptionHandler(async (req, res, next) => {
        const { email, password } = req.body
        try {
            const data = await users.signIn(email, password)
            if (data.success === false) {
                next(new ResourceError('Unaothorized', 401))
            }
            const { jwt, user, posts } = data
            res.status(200).json({
                msg: 'successfully logged in user!',
                jwt,
                user,
                posts
            })
        } catch (e) {
            next(new ResourceError(e.toString(), 500))
        }
    })
)

module.exports = router
