exports.up = function(knex, Promise) {
  return knex.schema.createTable('Listing', table => {
    table.increments('id').primary();

    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('User.id').onDelete('CASCADE');

    table.text('location').notNullable().defaultTo('');
    table.integer('dimensions').notNullable().defaultTo(0);
    table.integer('rent').notNullable().defaultTo(0);
    table.text('date').notNullable().defaultTo('');
    table.text('amenities').notNullable().defaultTo('');

    table.timestamp('timeCreated').notNullable().default(knex.fn.now());
    table.timestamp('timeModified').notNullable().default(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Listing');
};
