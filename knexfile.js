require("dotenv").config({ path: "./.env" });
const pgUser = process.env.PG_USER || "chris";
const pgDb = process.env.PG_DB || "luncher";
const pgPass = process.env.PG_PASS;
// const prodConnection = `postgres://${pgUser}@localhost/${pgDb}`;

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "chris",
      password: pgPass,
      database: "luncher"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "chris",
      password: pgPass,
      database: "luncher"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  }
};
