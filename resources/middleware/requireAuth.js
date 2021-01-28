const token = require('../../auth/token')
const enableExceptionHandler = require('../util/enableExceptionHandler')
const ResourceError = require('../errors/ResourceError')

module.exports = enableExceptionHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log('asd', authHeader)
    if (authHeader === undefined) {
        res.status(401).json({ msg: 'error: no authorization header' })
    }
    const verifiedToken = token.verify(authHeader.split(' ')[1])
    console.log(verifiedToken)
    if (!verifiedToken) {
        throw new ResourceError('Unauthorized', 401)
    } else {
        req.userId = verifiedToken.id
        next()
    }
})
