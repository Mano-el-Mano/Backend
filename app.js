require('dotenv').config()
const db = require('./db/pg/models')
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const publicRoutes = require('./resources/routes/public')
const protectedRoutes = require('./resources/routes/protected')
const router = express.Router()
const ResourceError = require('./resources/errors/ResourceError')
const requireAuthentication = require('./resources/middleware/requireAuth')
const cors = require('cors')
const soap = require('soap')
const wsdl = require('fs').readFileSync('./soap/wscalc1.wsdl', 'utf8')
const service = require('./soap/testServer')
const http = require('http')
const onError = require('./resources/errors/error-handler')

const PORT = process.env.port || 3000
const SOAP_PORT = process.env.soapPort || 8001

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
if (process.env.mode === 'development') {
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

app.use(onError)

const server = http.createServer(function (request, response) {
    response.end('404: Not Found: ' + request.url)
})

server.listen(SOAP_PORT, () =>
    console.log(`Soap service listening on port ${SOAP_PORT}`)
)
soap.listen(server, '/wscalc1', service, wsdl)

app.listen(PORT, () => {
    db.sync()
        .then(() => {
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
