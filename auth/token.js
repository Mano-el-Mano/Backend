const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(
    path.join(path.join(path.dirname(__filename), 'ssh')),
    'utf8'
)
const PUBLIC_KEY = fs.readFileSync(
    path.join(path.join(path.dirname(__filename), 'ssh.pub')),
    'utf8'
)

const signJwt = payload => {
    const signOptions = {
        issuer: 'mindtherags',
        expiresIn: '30d',
        algorithm: 'RS256'
    }
    return jwt.sign(payload, PRIVATE_KEY, signOptions)
}

const verifyJwt = token => {
    const verifyOptions = {
        issuer: 'mindtherags',
        expiresIn: '30d',
        algorithms: ['RS256']
    }
    try {
        return jwt.verify(token, PUBLIC_KEY, verifyOptions)
    } catch (err) {
        return false
    }
}

const decodeJwt = token => {
    return jwt.decode(token, { complete: true })
}

module.exports = {
    decode: decodeJwt,
    sign: signJwt,
    verify: verifyJwt
}
