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
        },
        {
          admin_id: 3,
          school_name: "Bronx High School of Science",
          address: "123 Heroku St",
          city: "Bronx",
          state: "NY",
          zipcode: "10463",
          funds_needed: 90000,
          funds_raised: 0
        },
        {
          admin_id: 2,
          school_name: "John F. Kennedy High School",
          address: "123 Heroku St",
          city: "Bronx",
          state: "NY",
          zipcode: "10463",
          funds_needed: 30000,
          funds_raised: 0
        }
      ]);
    });
};
