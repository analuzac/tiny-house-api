exports.up = function(knex, Promise) {
  return knex.schema.createTable('User', table => {
    table.increments('id').primary();

    table.text('name').notNullable().defaultTo('');
    table.text('email').notNullable().defaultTo('');
    table
      .specificType('hashedPassword', 'char(60)')
      .notNullable()
      .defaultTo('');

    table.timestamp('timeCreated').notNullable().default(knex.fn.now());
    table.timestamp('timeModified').notNullable().default(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('User');
};
