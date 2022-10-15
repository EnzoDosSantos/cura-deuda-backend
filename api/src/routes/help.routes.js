const { Router } = require('express')

const routes = Router()


routes.get("/", (req, res) => {
    const guide = {
        "GET /cities": "Devuelve todas las ciudades",
        "GET /cities?cp= *cp* ": "Devuelve todas las ciudades con el código postal indicado",
        "GET /cities?municipio= *municipio* ": "Devuelve todas las ciudades con el municipio indicado",
        "GET /cities?estado= *estado* ": "Devuelve todas las ciudades con el estado indicado",
        "GET /cities?ciudad= *ciudad* ": "Devuelve todas las ciudades con el nombre indicado",
        "GET /cities/:id ": "Devuelve la ciudad con el id indicado",
    }
    res.send(guide)
})

module.exports = routes