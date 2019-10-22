const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("admins")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("admins").insert([
        {
          username: "admin",
          password: bcrypt.hashSync("password", 8),
          email: "willj@gmail.com",
          first_name: "Paul",
          last_name: "Rudd"
        },
        {
          username: "admin2",
          password: bcrypt.hashSync("password", 8),
          email: "admin2@gmail.com",
          first_name: "Ben",
          last_name: "Stiller"
        },
        {
          username: "admin3",
          password: bcrypt.hashSync("password", 8),
          email: "admin3@gmail.com",
          first_name: "Zack",
          last_name: "Galifinakis"
        }
      ]);
    });
};
