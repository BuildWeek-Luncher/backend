const db = require("../dbConfig");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(id) {
  if (id) {
    return db("schools")
      .select("*")
      .where({ id })
      .first();
  } else {
    return db("schools");
  }
}
function insert(school) {
  return db("schools").insert(school);
}

function update(id, changes) {
  return db("schools")
    .update(changes)
    .where({ id });
}

function remove(id) {
  return db("schools")
    .del()
    .where({ id });
}
