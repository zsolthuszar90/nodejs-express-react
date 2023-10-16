import request from "supertest";
import server from "./server"

describe("/spendings", () => {
  test("It should response the GET method", done => {
    request(server)
      .get("/api/spendings")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response to the POST method", done => {
    request(server)
      .post("/api/spendings")
      .send({id: 'test', description: 'test', amount: 20, currency: 'USD'})
      .then(response => {
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response to the POST method with invalid payload", done => {
    request(server)
      .post("/api/spendings")
      .send({invalid: 'test'})
      .then(response => {
        expect(JSON.parse(response.text).type).toBe("ValidationError")
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("It should response error 400 the POST method without payload", done => {
    request(server)
      .post("/api/spendings")
      .then(response => {
        expect(JSON.parse(response.text).type).toBe("ValidationError")
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("It should delete selected entry", done => {
    request(server)
      .delete("/api/spendings/test")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
