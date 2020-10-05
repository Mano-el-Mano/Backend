const token = require('../../auth/token')
const forwarder = require('../util/forwarder')
const ResourceError = require('../errors/ResourceError')

module.exports = forwarder(async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader === undefined) {
        res.status(401).json({ msg: 'error: no authorization header' })
    }
    try {
        const { id } = token.verify(authHeader.split(' ')[1])
        req.userId = id
        next()
    } catch (e) {
        next(new ResourceError(e.toString()), 401)
    }
})
