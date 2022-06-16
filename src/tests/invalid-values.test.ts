import request from "supertest";
import { server } from "../server";
import { mockOne } from "./mocks";

describe("Test invalid values", () => {
  it("Should respond 404 for invalid userId", async () => {
    const response = await request(server).post("/api/users/1");
    expect(response.statusCode).toBe(404);
  });

  let userId = "";

  it("Should create user and return id", async () => {
    const response = await request(server).post("/api/users").send(mockOne);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeTruthy();
    userId = response.body.id;
  });

  it("Should delete user", async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(204);
  });

  it("Should respond 404 when delete user that doesn't exist", async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(404);
  });

  it("Should respond 404 when get user that doesn't exist", async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(404);
  });

});
