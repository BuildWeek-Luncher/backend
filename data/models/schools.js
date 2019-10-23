const db = require("../dbConfig");

module.exports = {
  get,
  getBy,
  insert,
  addFunds,
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

function getBy(filter) {
  return db("schools")
    .where(filter)
    .select("*")
    .first();
}

function insert(school) {
  return db("schools").insert(school);
}

function update(id, changes) {
  return db("schools")
    .update(changes)
    .where({ id });
}

function addFunds(id, donation) {
  return db("schools")
    .where({ id })
    .update({ funds_raised: db.raw(`funds_raised + ${donation}`) }, [
      "funds_raised"
    ]);
}

function remove(id) {
  return db("schools")
    .del()
    .where({ id });
}
