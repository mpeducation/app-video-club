const peliculaModel = require('../models/peliculas.models');

const getAll = async (req, res) => { 

    try {

        const peliculas = await peliculaModel.find({}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        // Tendría que verificar que existan
        //console.log(peliculas)
       // res.status(200).json(peliculas)
       res.status(200).render(
            'peliculas/index', 
            { 
                peliculas, // peliculas: peliculas
                title: 'Video Club - Listado de películas'
            }
       )

    } catch (error) {
        console.log(error)
    }

}

const getOne = async (req, res) => {
    try {
        const { id } = req.params
        //console.log(id)

        const pelicula = await peliculaModel.findById(id).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript
        // console.log(pelicula)

        res.render('peliculas/show', { pelicula, title: `Video Club - Viendo: ${pelicula.title}`})
    } catch (error) {
        console.log('Error en getOne', error)
    }
}

const formCreate = (req, res) => { 
    res.render('peliculas/create', { title: 'Video Club - Crear película'})
}

const create = async (req, res) => { 

    try {
        console.log(req.body)
        //const { title, genre, year } = req.body

        //const pelicula = new peliculaModel({ title, genre, year})
        const pelicula = new peliculaModel(req.body)
        // pelicula.user = req.user.id
        // console.log(req.user.id)
        await pelicula.save()
        res.status(201).redirect('/peliculas')

    } catch (error) {

        console.log(`Algo falló en el create: ${error}`)
        res.status(500).json({
            msg: 'Algo falló en el servidor',
            error: true
        })
        
    }
}

const formEdit = async (req, res) => { // locahost:8080/peliculas/edit/1

    try {
        const { id } = req.params
        //console.log(id)

        const pelicula = await peliculaModel.findById(id).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript
        console.log(pelicula)

        /* if( !pelicula ) {
            return res...
        } */

        res.render('peliculas/edit', { pelicula, title: `Video Club - Editando: ${pelicula.title}`})
    } catch (error) {
        console.log('Error formEdit', error)
    }
}

const editMovie = async (req, res) => { // peliculas/:id

    try {
        const { id } = req.params
        const pelicula = req.body

        await peliculaModel.updateOne({_id: id}, {$set: pelicula})

        res.status(200).redirect('/peliculas')
        
    } catch (error) {
        console.log('Falló el edit', error)
        res.status(500).send('Error interno del servidor, se rompió todo!')
    }
}

const deleteMovie = async (req, res) => { // peliculas/:id
    try {
        await peliculaModel.findByIdAndDelete(req.params.id)

        res.status(200).redirect('/peliculas')
        
    } catch (error) {
        console.log('Error DELETE', error)
        res.status(500).send('Algo salió mal')     
    }
}

module.exports = {
    getAll,
    formCreate,
    create,
    deleteMovie,
    formEdit,
    editMovie,
    getOne
}