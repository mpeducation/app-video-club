const express = require('express')
const routerAuth = express.Router()

const { getFormSignUp, signup, getFormSignIn, signin, logout } = require('../controllers/auth.controller')

// Routers Auth

routerAuth.get('/signup', getFormSignUp)
routerAuth.post('/signup', signup)

routerAuth.get('/signin', getFormSignIn)
routerAuth.post('/signin', signin)

routerAuth.get('/logout', logout)


module.exports = routerAuth