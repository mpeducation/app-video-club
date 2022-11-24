const passport = require("passport")

const Auth = require("../models/auth.models")

const getFormSignUp = (req, res) => res.render('auth/signup')

const signup = async (req, res) => {

    try {
        const errors = []
        const { name , email, password, confirm_password } = req.body
        // console.log(name, email, password, confirm_password)

        if ( password !== confirm_password) {
            errors.push({ msg: 'La contraseña no coincide'})
        }

        if ( password.length < 4 ) {
            errors.push({ msg: 'La contraseña debe tener al menos 4 caracteres'})
        }

        if (errors.length > 0) {
            return res.send('Hay errores')
            /* return res.render('auth/signup', { errors, name, email })  */
        }

        const userFound = await Auth.findOne( { email })

        if ( userFound ) {
            req.flash('todo_error', 'El mail ya existe en nuestros registros')
            //return res.send('Ya existe el usuario en nuestros registros')
            return res.redirect('/auth/signin')
        }

        const newUser = new Auth({name, email, password})
        newUser.password = await newUser.passwordEncrypt(password)

        await newUser.save()
        req.flash('todo_ok', 'Se registró correctamente')
        res.redirect('/auth/signin')
        //res.send('Todo salio bien, usuario creado')

    } catch (error) {
        console.log('ERROR CATASTROFICO', error)
    }
    
}

const getFormSignIn = (req, res) => res.render('auth/signin')

const signin = passport.authenticate('local', {
    successRedirect: '/peliculas',
    failureRedirect: '/auth/signin'
})

const logout = async (req, res) => {
    await req.logout( err => {
        if ( err ) return next()
        res.redirect('/auth/signin')
    })
}

module.exports = {
    getFormSignUp,
    signin,
    signup,
    getFormSignIn,
    logout
}