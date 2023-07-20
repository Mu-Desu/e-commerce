module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next) //? create a function that return a promise that exutes a function (route)then catch any errors
    }
}