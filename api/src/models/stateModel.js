const { Schema, model } = require('mongoose')

const stateSchema = new Schema({
    d_estado: {
        type: String,
        required: true
    },
    c_estado: {
        type: Number,
        required: true
    },
    muni_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Muni',
    }]
}, {
    timestamps: false,
    versionKey: false
})

// en la db aun existe el _id y el __v, la cosa es que al hacer el send al front lo enviemos como id y lo demas se borra
// para hacer cualquier peticion en base al id en el back van a tener que usar _id, si no no va a encontrar nada.
stateSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const stateModel = model('State', stateSchema)

module.exports = stateModel