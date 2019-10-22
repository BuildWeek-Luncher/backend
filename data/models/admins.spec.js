const request = require("supertest");
const server = require("../../server");
const db = require("../dbConfig");

describe("auth router", () => {
  beforeEach(async () => {
    await db("admins").del();
  });
  describe("POST /api/register", () => {
    it("should return 400 if body is invalid", () => {
      return request(server)
        .post("/api/register")
        .send({
          username: "chris",
          password: "password",
          email: "tehkount@gmail.com",
          first_name: "chris",
          last_name: "bonifacio"
        })
        .expect(400)
        .expect("Content-Type", /json/);
    });
  });
});
