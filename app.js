require('dotenv').config()
const db = require('./db/pg/models')
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const publicRoutes = require('./api/routes/public')
const protectedRoutes = require('./api/routes/protected')
const router = express.Router()
const ResourceError = require('./errors/ResourceError')
const requireAuthentication = require('./api/middleware/requireAuthentication')
const cors = require('cors')

const PORT = process.env.NODE_ENV.PORT

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
if (process.env.NODE_ENV === 'development') {
    app.use('*', (req, res, next) => {
        console.log('body of request', req.body)
        next()
    })
}

app.use(router)
router.use('/public', publicRoutes)
router.use('/protected', requireAuthentication, protectedRoutes)

app.all('*', (req, res, next) => {
    next(
        new ResourceError(
            `Can't find correspondeing resource: ${req.originalUrl}`,
            404
        )
    )
})

app.listen(PORT, () => {
    db.sync()
        .then(_ => {
            console.log(
                `started postgres and the mindtherags backend listening on http://localhost:${PORT}`
            )
        })
        .catch(e => {
            console.warn(e)
        })
})

process.on('unhandledRejection', reason => {
    console.warn('shutting down: ', reason)
    process.exit(1)
})

process.on('uncaughtException', reason => {
    console.warn('shutting down: ', reason)
    process.exit(1)
})
