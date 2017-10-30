exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Favorite')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Favorite').insert([
        {
          id: 1,
          userId: 1,
          listingId: 1
        }
      ]);
    })
    .then(() =>
      knex.raw(
        `SELECT setval('"Favorite_id_seq"', (SELECT MAX("id") FROM "Favorite"))`
      )
    );
};
