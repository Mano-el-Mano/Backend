const express = require('express')
const postRoutes = require('./posts')

const router = express.Router()

router.use('/posts', postRoutes)

module.exports = router
