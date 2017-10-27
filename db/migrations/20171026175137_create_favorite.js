exports.up = function(knex, Promise) {
  return knex.schema.createTable('Favorite', table => {
    table.increments('id').primary();

    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('User.id').onDelete('CASCADE');

    table.integer('listingId').unsigned().notNullable();
    table.foreign('listingId').references('Listing.id').onDelete('CASCADE');

    table.timestamp('timeCreated').notNullable().default(knex.fn.now());
    table.timestamp('timeModified').notNullable().default(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Favorite');
};
