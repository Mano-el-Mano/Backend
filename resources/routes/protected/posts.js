const express = require('express')
const router = express.Router()
const posts = require('../../../logic/posts')
const ResourceError = require('../../errors/ResourceError')
const forwarder = require('../../util/forwarder')

router.post(
    '/',
    forwarder(async (req, res, next) => {
        const { userId } = req
        const { content } = req.body

        try {
            const post = await posts.createpost(userId, content)
            res.status(201).json({
                msg: 'successfully created post!',
                post
            })
        } catch (e) {
            next(new ResourceError(e.toString(), 500))
        }
    })
)

module.exports = router
