exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("admins")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("admins").insert([
        {
          username: "admin",
          password: "password",
          email: "willj@gmail.com",
          first_name: "William",
          last_name: "Johnson"
        }
      ]);
    });
};
