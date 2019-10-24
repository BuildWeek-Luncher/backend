const db = require("../dbConfig");

module.exports = {
  get,
  getBy,
  insert,
  update,
  remove
};

function get(id) {
  if (id) {
    return db("admins")
      .select("*")
      .where({ id });
  } else {
    return db("admins");
  }
}

function getBy(filter) {
  return db("admins")
    .where(filter)
    .select("*")
    .first();
}

function insert(admin) {
  db("admins")
    .insert(admin)
    .then(() => {
      return db("admins")
        .select("*")
        .where({ username: admin.username });
    });
}

function update(id, changes) {
  return db("admins")
    .update(changes, "*")
    .where({ id });
}

function remove(id) {
  return db("admins")
    .del()
    .where({ id });
}
