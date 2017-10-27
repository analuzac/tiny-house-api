exports.up = function(knex, Promise) {
  return knex.schema.createTable('Favorite', table => {
    table.increments('id').primary();

    table.integer('userId').unsigned().notNullable().index();
    table.foreign('userId').references('Users.id').onDelete('CASCADE');

    table.integer('listingId').unsigned().notNullable().index();
    table.foreign('listingId').references('Listing.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Favorite');
};
