const express = require('express');
const Infectados = require ('../models/infectado');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Server is up and running')
})

router.get('/ListaInfectados', (req,res) => {
    Infectados.find()
        .exec()
        .then( x => res.status(200).send(x) )
})

router.post('/' , (req,res) => {
    Infectados.create( req.body ).then( x => res.status(201).send(x) )
})


module.exports = router;