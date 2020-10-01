module.exports = (_function) => {
    return (req, res, next) => {
        _function(req, res, next).catch((err) => next(err))
    }
}
