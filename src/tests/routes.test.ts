import request from "supertest";
import { server } from "../server";

describe("Routes test", () => {
  it("GET api/users: Should return empty array of users", async () => {
    const response = await request(server).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("Invalid route: Should response with 404", async () => {
    const response = await request(server).get("/random/route");
    expect(response.statusCode).toBe(404);
  });
});
