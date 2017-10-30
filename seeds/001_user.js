exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('User').insert([
        {
          id: 1,
          name: 'Backyard Host',
          email: 'backyardhost@gmail.com',
          hashedPassword:
            '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS' // youreawizard
        },
        {
          id: 2,
          name: 'Tiny Houser',
          email: 'tinyhouser@gmail.com',
          hashedPassword:
            '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS' // youreawizard
        }
      ]);
    })
    .then(() =>
      knex.raw(`SELECT setval('"User_id_seq"', (SELECT MAX("id") FROM "User"))`)
    );
};
