const express = require('express')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const routerPeliculas = require('./routes/peliculas.routes')
const routerAuth = require('./routes/auth.routes')

// Configuraciones
require('dotenv').config() 
const app = express()

// Configuración Handlebars
app.engine('hbs', engine({ extname: '.hbs'}))
app.set('view engine', 'hbs')
require('./config/passport')

// Middlware 
app.use(express.static('public')) // Me permite servir archivos estaticos desde la carpeta public
app.use(express.urlencoded({extended: true})) // Nos decodifica la informaicón que viaja por body
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.URI_MONGO_REMOTA})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
    res.locals.todo_ok = req.flash('todo_ok')
    res.locals.todo_error = req.flash('todo_error')
    next()
})

// app.use(routerPeliculas)
app.use('/', require('./routes/public.routes'))
app.use('/peliculas', routerPeliculas)
app.use('/auth', routerAuth)

const PORT = process.env.PORT

const arrancar = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGO_REMOTA)
        console.log('Base de datos conectada')
        app.listen(PORT)
        console.log(`Todo funcionando peola, en el puerto: ${PORT}`)
    } catch (error) {
        console.log(`Tuvimos un problema ${error}`)
    }
}

arrancar()
