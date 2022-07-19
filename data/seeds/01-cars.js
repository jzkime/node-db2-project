// STRETCH
exports.seed = async function(knex) {
    await knex('cars').truncate();
    await knex('cars').insert([
        {vin: 'ASDFGH', make: 'super-coo', model: 'brand-name', mileage: 002, title: 'vroom', transmission: 'dual-clutch'}
    ])
}