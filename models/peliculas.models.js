const mongoose = require('mongoose')

/* -------------------------------------------- */
/* SCHEMA: Me define como va a ser el documento */
/* -------------------------------------------- */

const peliculaSchema = mongoose.Schema(
    {
        title: String,
        genre: {
            type: String,
            required: true
        },
        year: Number,
        /* slug: String */
    },
    {
        versionKey: false,
        timestamps: true
    }
)

// Middleware .pre()

/* peliculaSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    next()
}) */



module.exports = mongoose.model('Peliculas', peliculaSchema)