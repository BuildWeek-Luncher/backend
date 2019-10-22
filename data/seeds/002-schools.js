exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("schools")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("schools").insert([
        {
          admin_id: 1,
          school_name: "Web Academy",
          address: "123 Heroku St",
          city: "Bronx",
          state: "NY",
          zipcode: "10463",
          funds_needed: 50000,
          funds_raised: 0
        }
      ]);
    });
};
