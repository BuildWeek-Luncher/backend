const request = require("supertest");
const server = require("../../server");
const db = require("../dbConfig");

describe("auth router", () => {
  describe("POST /api/admins/register", () => {
    beforeEach(async () => {
      await db.raw("TRUNCATE admins RESTART IDENTITY CASCADE");
    });

    it("should return 400 if body is invalid", () => {
      return request(server)
        .post("/api/admins/register")
        .send({
          username: "usertest"
        })
        .expect(400)
        .expect("Content-Type", /json/);
    });

    it("should return 201 if body is valid", () => {
      return request(server)
        .post("/api/admins/register")
        .send({
          username: "usertest",
          password: "password",
          email: "user@gmail.com",
          first_name: "user",
          last_name: "test"
        })
        .expect(201)
        .expect("Content-Type", /json/);
    });
  });

  describe("POST /api/admins/login", () => {
    it("should return 400 if login is invalid", () => {
      return request(server)
        .post("/api/admins/login")
        .send({ username: "admin", password: "wrong" })
        .expect(400);
    });

    it("should return 200 if login is valid and send a token", async () => {
      return request(server)
        .post("/api/admins/login")
        .send({
          username: "usertest",
          password: "password"
        })
        .then(res => {
          expect(res.body.token).toBeTruthy();
        });
    });
  });

  describe("GET /api/admins", () => {
    it("should return 200 and array of admins", () => {
      return request(server)
        .get("/api/admins")
        .expect(200)
        .expect(res => {
          expect(res.body instanceof Array).toBeTruthy();
        });
    });
  });
});
