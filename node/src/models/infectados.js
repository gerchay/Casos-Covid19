import mongoose, { Schema } from 'mongoose';

const Infectados = mongoose.model('Infectado', new Schema({
    name: String,
    location: String,
    age: Number,
    infected_type: String,
    state: String
}, {
    versionKey: false
}))

module.exports = Infectados;