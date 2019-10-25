const request = require("supertest");
const server = require("../../server");
const db = require("../dbConfig");

describe("schools router", () => {
  describe("GET /api/schools", () => {
    it("should return 200 and an array of schools", () => {
      return request(server)
        .get("/api/schools")
        .expect(200)
        .expect(res => {
          console.log(res.body);
          expect(res.body instanceof Array).toBeTruthy();
        });
    });
  });
});
