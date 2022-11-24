const express = require('express')
const routerPublic = express.Router()

const peliculasModel = require('../models/peliculas.models')

routerPublic.get('/', async (req, res) => {

    try {
        const peliculas = await peliculasModel.find({}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

       res.status(200).render(
            'index', 
            { 
                peliculas // peliculas: peliculas 
            }
       )

    } catch (error) {
        console.log(error)
    }

})

module.exports = routerPublic