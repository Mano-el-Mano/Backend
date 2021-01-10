module.exports = enableExceptionHandler => {
    return (req, res, next) => {
        enableExceptionHandler(req, res, next).catch(err => next(err))
    }
}
