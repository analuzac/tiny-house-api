exports.up = function(knex, Promise) {
  return knex.schema.createTable('Listing', table => {
    table.increments('id').primary();

    table.integer('userId').unsigned().notNullable().index();
    table.foreign('userId').references('Users.id').onDelete('CASCADE');

    table.text('location').notNullable().defaultTo('');
    table.text('dimensions').notNullable().defaultTo('');
    table.text('rent').notNullable().defaultTo('');
    table.text('date').notNullable().defaultTo('');
    table.text('amenities').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Listing');
};
