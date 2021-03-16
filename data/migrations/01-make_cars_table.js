
exports.up = function (knex) {
  return knex.schema
    .createTable('cars', table => {
      table.increments('id')
      table.string('vin').unique().notNullable()
      table.string('model').notNullable()
      table.integer('mileage').notNullable()
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('cars')
};
