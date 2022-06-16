import request from "supertest";
import { server } from "../server";
import { mockOne, mockThree, mockTwo } from "./mocks";

describe("Create, get and delete users", () => {
  const userIds: string[] = [];

  it("Create first user and return id", async () => {
    const response = await request(server).post("/api/users").send(mockOne);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeTruthy();
    userIds.push(response.body.id);
  });

  it("Create second user and return id", async () => {
    const response = await request(server)
      .post("/api/users")
      .send(JSON.stringify(mockTwo));
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeTruthy();
    userIds.push(response.body.id);
  });

  it("Should return array with two users", async () => {
    const response = await request(server).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("Should update user", async () => {
    const response = await request(server)
      .put(`/api/users/${userIds[0]}`)
      .send(mockThree);
    expect(response.statusCode).toBe(200);
  });

  it("Should get updated user", async () => {
    const response = await request(server).get(`/api/users/${userIds[0]}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(mockThree.username);
  });
});
