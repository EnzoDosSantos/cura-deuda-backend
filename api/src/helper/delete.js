require('../../mongo');
const Colony = require('../models/colonyModel')
const Muni = require('../models/muniModel')
const State = require('../models/stateModel')

const deleteCities = async () => {
    try {
        console.time("Deleting everything")
        await Colony.deleteMany({})
        await Muni.deleteMany({})
        await State.deleteMany({})
        console.timeEnd("Deleting everything")
    } catch (error) {
        console.log(error)
        return
    }
}

deleteCities()