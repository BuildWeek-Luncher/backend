const db = require("../dbConfig");

module.exports = {
  get,
  getBy,
  insert,
  update,
  remove
};

function get(id) {
  if (!id) {
    return db("admins")
      .select("*")
      .where({ id });
  } else {
    return db("admins");
  }
}

function getBy(filter) {
  return db("admins")
    .select("*")
    .where(filter);
}

async function insert(admin) {
  await db("admins").insert(admin);
  return db("admins").getBy({ username: admin.username });
}

function update(id, changes) {
  return db("admins")
    .update(changes)
    .where({ id });
}

function remove(id) {
  return db("admins")
    .del()
    .where({ id });
}
