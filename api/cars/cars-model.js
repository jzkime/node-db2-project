const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars')
    .where({id: id})
    .first();
}

const create = (car) => {
  return db('cars')
    .insert(car)
    .then(arrId => getById(arrId[0]))
}

const getByVin = (vin) => {
  console.log('in getByVin', vin)
  return db('cars')
    .select('vin')
    .where('vin', vin)
    .first();
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}