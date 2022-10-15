const { Schema, model } = require('mongoose')

const colonySchema = new Schema({
    d_codigo:{
        type: Number,
        required: true
    },
    d_asenta:{
        type: String,
        required: true
    },
    d_tipo_asenta:{
        type: String,
        required: true
    },
    d_ciudad:{
        type: String,
    },
    d_CP:{
        type: String,
        required: true
    },
    c_oficina:{
        type: String,
        required: true
    },
    c_tipo_asenta:{
        type: String,
        required: true
    },
    id_asenta_cpcons:{
        type: String,
        required: true
    },
    d_zona:{
        type: String,
        required: true
    },
    c_cve_ciudad:{
        type: String,
    }
}, {
    timestamps: false,
    versionKey: false
})

colonySchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const colonyModel = model('Colony', colonySchema)

module.exports = colonyModel