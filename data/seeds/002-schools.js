exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("schools")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("schools").insert([{}]);
    });
};
