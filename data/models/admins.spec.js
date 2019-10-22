const request = require("supertest");
const server = require("../../server");
const db = require("../dbConfig");

describe("auth router", () => {
  beforeEach(async () => {
    await db("schools").truncate();
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
    it("should return 200 if body is valid", () => {
      return request(server)
        .post("/api/register")
        .send({
          username: "dannyrod",
          password: "password",
          email: "drod@gmail.com",
          first_name: "Daniel",
          last_name: "Rodriguez"
        })
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });
});
