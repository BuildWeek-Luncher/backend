exports.up = function(knex) {
  return knex.schema
    .createTable("admins", tbl => {
      tbl.increments();
      tbl
        .string("username")
        .unique()
        .notNullable();
      tbl
        .string("email")
        .unique()
        .notNullable();
      tbl.string("password").notNullable();
      tbl.string("first_name").notNullable();
      tbl.string("last_name").notNullable();
    })
    .createTable("schools", tbl => {
      tbl.increments();
      tbl
        .integer("admin_id")
        .references("id")
        .inTable("admins")
        .notNullable()
        .onDelete("CASCADE");
      tbl
        .string("school_name")
        .unique()
        .notNullable();
      tbl.string("address").notNullable();
      tbl.string("city").notNullable();
      tbl.string("state").notNullable();
      tbl.string("zipcode", 10).notNullable();
      tbl.integer("funds_needed").notNullable();
      tbl.integer("funds_raised").notNullable();
    });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("schools").dropTableIfExists("admins");
};
