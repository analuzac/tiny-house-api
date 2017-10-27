exports.up = function(knex, Promise) {
  return knex.schema.createTable('User', table => {
    table.increments('id').primary();
    table.text('name').notNullable().defaultTo('');
    table.text('email').notNullable().defaultTo('');
    table.text('password').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('User');
};
