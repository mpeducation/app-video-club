const express = require('express');
const routerPeliculas = express.Router();

const controller = require('../controllers/peliculas.controller');
const isAuthenticated = require('../middlewares/isauthenticated');


/* cRud - READ ALL -> GET ALL */
routerPeliculas.get('/', isAuthenticated, controller.getAll) // locahost:8080/peliculas/

// GET: Formulario de creación de película
routerPeliculas.get('/create', isAuthenticated, controller.formCreate) // locahost:8080/peliculas/create

// GET: Formulario de edición de película
routerPeliculas.get('/edit/:id', isAuthenticated, controller.formEdit)

/* cRud - READ ONE -> GET ONE */
routerPeliculas.get('/:id', isAuthenticated, controller.getOne)

/* Crud - CREATE MOVIE -> POST */
routerPeliculas.post('/', isAuthenticated, controller.create)

/* crUd - UPDATE MOVIE -> PUT */
routerPeliculas.put('/:id', isAuthenticated, controller.editMovie)

/* cruD - DELETE MOVIE -> DELETE */
routerPeliculas.delete('/:id', isAuthenticated, controller.deleteMovie)

module.exports = routerPeliculas