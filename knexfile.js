require("dotenv").config({ path: "./.env" });
const pgUser = process.env.PG_USER || "chris";
const pgDb = process.env.PG_DB || "luncher";
const pgPass = process.env.PG_PASS;
// const prodConnection = `postgres://${pgUser}@localhost/${pgDb}`;

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
    connection: {
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_NAME
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
