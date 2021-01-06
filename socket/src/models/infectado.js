const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Infectado = mongoose.model('Infectado', new Schema({
    name: String,
    location: String,
    age: Number,
    infected_type: String,
    state: String
}, {
    versionKey: false
}))

module.exports = Infectado;