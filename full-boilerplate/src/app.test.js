import request from "supertest";
import app from "./app.js";
import { createToken } from "./tests/jwks.js";

describe("POST /", () => {
  it("should respond with 400 if the JSON payload is invalid", async () => {
    const token = createToken();
    const response = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send("{");
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: "Bad Request",
      message: "Unexpected end of JSON input",
    });
  });
});

describe("GET /should-not-exist", () => {
  it("should respond with 404", async () => {
    const token = createToken();
    const response = await request(app)
      .get("/should-not-exist")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      statusCode: 404,
      error: "Not Found",
      message: "Cannot GET /should-not-exist",
    });
  });
});
