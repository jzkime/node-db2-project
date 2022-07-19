const carMod = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const {id} = req.params;
  let car = await carMod.getById(id)  
    if(!car) return next({status: 404, message: `"car with id ${id} is not found"`});
  req.car = car;
  next()
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if(!vin) return next({status: 400, message: `vin is missing`})
  if(!make) return next({status: 400, message: `make is missing`})
  if(!model) return next({status: 400, message: `model is missing`})
  if(!mileage) return next({status: 400, message: `mileage is missing`})
  req.carPl = {
    vin: vin.trim(),
    make: make.trim(),
    model: model.trim(),
    mileage: mileage,
    ...req.body
  }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.carPl;
  let valVin = vinValidator.validate(vin)
  if(!valVin) return next({status: 400, message: `vin ${vin} is invalid`});
  next();
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.carPl;
  let carVin = await carMod.getByVin(vin)
  if(carVin) return next({ status: 400, message: `vin ${vin} already exists` })
  next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
