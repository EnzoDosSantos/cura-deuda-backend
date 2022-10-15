const State = require('../models/stateModel')
const Colony = require('../models/colonyModel')
const Muni = require('../models/muniModel')

const getAllCities = async () => {
    try {
        const cities = await State.find({})
            .populate({
                path: 'muni_id',
                populate: {
                    path: 'colony_id',
                    model: 'Colony'
                }
            })
            
        return cities
    } catch (error) {
        return error
    }
}

const getCitiesByPath = async (cp, path) => {
    const cities = await getAllCities()
    const citiesFiltered = []

    cities.forEach(city => {
        city.muni_id.forEach(muni => {
            muni.colony_id.forEach(colony => {
                if (colony[path] == cp) {
                    citiesFiltered.push({
                        c_estado: city.c_estado,
                        d_estado: city.d_estado,
                        D_mnpio: muni.D_mnpio,
                        c_mnpio: muni.c_mnpio,
                        c_cve_ciudad: colony.c_cve_ciudad,
                        d_zona: colony.d_zona,
                        id_asenta_cpcons: colony.id_asenta_cpcons,
                        c_tipo_asenta: colony.c_tipo_asenta,
                        c_oficina: colony.c_oficina,
                        d_CP: colony.d_CP,
                        d_ciudad: colony.d_ciudad,
                        d_tipo_asenta: colony.d_tipo_asenta,
                        d_asenta: colony.d_asenta,
                        d_codigo: colony.d_codigo
                    })
                }
            })
        })
    })

    return citiesFiltered
}

const getCitiesByMuni = async (municipio) => {
    const cities = await getAllCities()
    const obj = {
        citiesFiltered: [],
    }
    cities.forEach(city => {
        city.muni_id.forEach(muni => {
            if (muni.D_mnpio === municipio) {
                obj.citiesFiltered.push({
                    c_estado: city.c_estado,
                    d_estado: city.d_estado,
                    muni_id: [
                        {
                            D_mnpio: muni.D_mnpio,
                            c_mnpio: muni.c_mnpio,
                            colony_id: muni.colony_id
                        }
                    ]
                })
            }
        })
    })
    return obj
}

const getCitiesByState = async (estado) => {
    const cities = await getAllCities()
    const obj = {
        citiesFiltered: [],
    }
    cities.forEach(city => {
        if (city.d_estado === estado) {
            obj.citiesFiltered.push({
                c_estado: city.c_estado,
                d_estado: city.d_estado,
                muni_id: city.muni_id
            })
        }
    })
    return obj
}

const getCitiesByCity = async (ciudad) => {
    const cities = await getCitiesByPath(ciudad, 'd_ciudad')
    return cities
}

const getCitiesByID = async (id) => {
    console.log(id)
    const cities = await Colony.findById(id)
    const municipe = await Muni.findOne({ colony_id: id })
    const state = await State.findOne({ muni_id: municipe._id })
    const citiesFiltered = {
        c_estado: state.c_estado,
        d_estado: state.d_estado,
        D_mnpio: municipe.D_mnpio,
        c_mnpio: municipe.c_mnpio,
        c_cve_ciudad: cities.c_cve_ciudad,
        d_zona: cities.d_zona,
        id_asenta_cpcons: cities.id_asenta_cpcons,
        c_tipo_asenta: cities.c_tipo_asenta,
        c_oficina: cities.c_oficina,
        d_CP: cities.d_CP,
        d_ciudad: cities.d_ciudad,
        d_tipo_asenta: cities.d_tipo_asenta,
        d_asenta: cities.d_asenta,
        d_codigo: cities.d_codigo
    }
    return citiesFiltered
}


module.exports = { getAllCities, getCitiesByPath, getCitiesByMuni, getCitiesByState, getCitiesByCity, getCitiesByID }