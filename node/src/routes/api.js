import express from 'express';
import Infectados from '../models/infectados'

const router = express.Router();

router.get('/', (req,res) => {
    Infectados.find()
        .exec()
        .then( x => res.status(200).send(x) )
})

router.post('/' , (req,res) => {
    Infectados.create( req.body ).then( x => res.status(201).send(x) )
})


module.exports = router;