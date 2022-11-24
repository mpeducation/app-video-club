const passport = require('passport')
const { Strategy } = require('passport-local')
const Auth = require('../models/auth.models')

passport.use(
    new Strategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {

            const user = await Auth.findOne({ email }) // EMAIL existe.

            if ( !user ) {
                return done(null, false, { message: 'User not found.'})
            }

            const isMatch = await user.checkPassword(password) // Si la comparación es OK

            if ( !isMatch ) {
                return done(null, false, { message: 'Password error.'})
            }
            
            // SI llegué hasta acá el usuario existe y es valido
            return done(null, user)

        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Auth.findById(id, (err, user) => {
        done(err, user)
    })
})
