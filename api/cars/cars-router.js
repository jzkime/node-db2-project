const express = require('express');
const router = express.Router();
const carMod = require('./cars-model');
const { 
    checkCarId, 
    checkCarPayload,
    checkVinNumberValid, 
    checkVinNumberUnique 
} = require('./cars-middleware')

router.get('/', (req, res, next) => {
    carMod.getAll()
        .then(cars => res.json(cars))
        .catch(next);
})

router.get('/:id', checkCarId, (req, res, next) => {
    try {
        res.json(req.car)
    } catch(err) {
        next(err)
    }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    carMod.create(req.carPl)
        .then(car => res.json(car))
        .catch(next)
})

router.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(err);
})

module.exports = router;