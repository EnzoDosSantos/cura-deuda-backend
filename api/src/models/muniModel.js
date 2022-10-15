const { Schema, model } = require('mongoose')

const muniSchema = new Schema({
    D_mnpio: {
        type: String,
        required: true
    },
    c_mnpio: {
        type: Number,
        required: true
    },
    colony_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Colony',
    }]
}, {
    timestamps: false,
    versionKey: false
})

muniSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const muniModel = model('Muni', muniSchema)

module.exports = muniModel