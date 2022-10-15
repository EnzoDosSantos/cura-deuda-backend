const { Router } = require('express')

const State = require('../models/stateModel')
const {getAllCities, getCitiesByPath, getCitiesByMuni, getCitiesByState, getCitiesByCity, getCitiesByID} = require('../utils/getAllCities')

const routes = Router()

routes.get("/", async (req, res) => {
    const { cp, municipio, estado, ciudad } = req.query
    if (!cp && !municipio && !estado && !ciudad) {
        try {
            const cities = await getAllCities()
            if (!cities.length) {
                return res.status(404).json({ message: "No hay ciudades" })
            }
            return res.status(200).json(cities)
        } catch (error) {
            return res.json({ error: error.message })
        }
    }

    if (cp && !municipio && !estado && !ciudad) {
        try {
            const cities = await getCitiesByPath(cp, 'd_CP')
            if (!cities.length) {
                return res.status(404).json({ message: "No hay ciudades" })
            }
            return res.status(200).json(cities)
        } catch (error) {
            return res.json({ error: error.message })
        }
    }

    if (!cp && municipio && !estado && !ciudad) {
        try {
            const cities = await getCitiesByMuni(municipio)
            if (!cities) {
                return res.status(404).json({ message: "No hay ciudades" })
            }
            return res.status(200).json(cities)
        } catch (error) {
            return res.json({ error: error.message })
        }
    }

    if (!cp && !municipio && estado && !ciudad) {
        try {
            const cities = await getCitiesByState(estado)
            if (!cities) {
                return res.status(404).json({ message: "No hay ciudades" })
            }
            return res.status(200).json(cities)
        } catch (error) {
            return res.json({ error: error.message })
        }
    }

    if (!cp && !municipio && !estado && ciudad) {
        try {
            const cities = await getCitiesByCity(ciudad)
            if (!cities.length) {
                return res.status(404).json({ message: "No hay ciudades" })
            }
            return res.status(200).json(cities)
        } catch (error) {
            return res.json({ error: error.message })
        }
    }

})

routes.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const city = await getCitiesByID(id)
        if (!city) {
            return res.status(404).json({ message: "No hay ciudades" })
        }
        return res.status(200).json(city)
    } catch (error) {
        return res.json({ error: error.message })
    }
})


module.exports = routes