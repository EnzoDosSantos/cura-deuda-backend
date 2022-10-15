require('../../mongo');
const data = require('../data/cities.json')
const Colony = require('../models/colonyModel')
const Muni = require('../models/muniModel')
const State = require('../models/stateModel')

const seedColonys = async () => {
    console.log("Iniciando...")
    console.time("Starting seed")
    try {
        await Colony.deleteMany({})
        await Muni.deleteMany({})
        await State.deleteMany({})

        const muniArr = []
        const stateArr = []

        data.cities.forEach(async (e) => {
            const { d_codigo, d_asenta, d_tipo_asenta, d_ciudad, d_CP, c_oficina, c_tipo_asenta, id_asenta_cpcons, d_zona, c_cve_ciudad, D_mnpio, c_mnpio, d_estado, c_estado } = e

            const muniToTest = muniArr.find((m) => m.D_mnpio === D_mnpio)

            if (!muniToTest) {
                const pushMuni = { D_mnpio, c_mnpio }
                muniArr.push(pushMuni)
                const muni = new Muni(pushMuni)
                await muni.save().then(async (m) => {
                    const stateToTest = stateArr.find((s) => s.d_estado === d_estado)
                    if (!stateToTest) {
                        const pushState = { d_estado, c_estado }
                        stateArr.push(pushState)
                        const state = new State(pushState)
                        await state.save().then(async (s) => {
                            console.log("Estado creado: ", s)
                            await Muni.findById({ _id: m._id })
                            if(muni){
                            s.muni_id.push(muni._id)
                            await s.save().then((s) => {
                                console.log("Estado actualizado: ", s)
                            })
                            }
                        })
                    }
                })
            }

            State.findOne({ d_estado: d_estado })
            .then(async (s) => {
                if(s){
                    const muni = await Muni.findOne({ D_mnpio: D_mnpio })
                    if(muni){
                        if(!s.muni_id.includes(muni._id)){
                        s.muni_id.push(muni._id)
                        s.save().then((s) => {
                            console.log("Estado actualizado: ", s)
                        })
                    }
                }
                }
            })
            
            const colony = new Colony({
                d_codigo,
                d_asenta,
                d_tipo_asenta,
                d_ciudad,
                d_CP,
                c_oficina,
                c_tipo_asenta,
                id_asenta_cpcons,
                d_zona,
                c_cve_ciudad,
            })
            await colony.save().then(async (colony) => {
                const muni = await Muni.findOne({ D_mnpio: D_mnpio })
                if(muni){
                    muni.colony_id.push(colony._id)
                    await muni.save().then((muni) => {
                        console.log("Municipio actualizado: ", muni)
                    })
                }
            })
        })
        
    } catch (error) {
        console.log(error)
        return
    }
}

seedColonys().then(async() => {
    console.timeEnd("Starting seed")
})