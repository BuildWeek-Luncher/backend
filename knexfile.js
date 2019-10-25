require("dotenv").config({ path: "./.env" });
const pgUser = process.env.PG_USER;
const pgDb = process.env.PG_DB;
const pgPass = process.env.PG_PASS;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: pgUser,
      password: pgPass,
      database: pgDb
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
    connection: process.env.HEROKU_POSTGRESQL_GRAY_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // useNullAsDefault: true
  }
};
