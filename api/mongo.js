const mongoose = require('mongoose')

const connectionString = "mongodb+srv://enzods:Holasoyenzo1@cluster0.jmeol.mongodb.net/test"
mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')
    }).catch((err) => {
        console.error(err)
})