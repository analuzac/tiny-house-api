exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Listing')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Listing').insert([
        {
          id: 1,
          userId: 2,
          location: 'Berkeley, CA',
          dimensions: 300,
          rent: 500,
          date: 'November 10, 2017',
          amenities: 'water hose, washer & dryer, backyard puppie'
        },
        {
          id: 2,
          userId: 1,
          location: 'Oakland, CA',
          dimensions: 200,
          rent: 400,
          date: 'December 1, 2017',
          amenities: 'next to Lake Merrit'
        }
      ]);
    })
    .then(() =>
      knex.raw(
        `SELECT setval('"Listing_id_seq"', (SELECT MAX("id") FROM "Listing"))`
      )
    );
};
