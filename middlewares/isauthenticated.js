const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) { // true o false => Si el usuario está logueado, le digo que puede crear, editar...
        return next()
    }
    res.send('No estas autorizado') // SI no estás autenticado, logueate!
}

module.exports = isAuthenticated