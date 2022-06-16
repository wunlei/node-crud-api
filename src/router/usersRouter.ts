import http from "http";
import { DataBase } from "../databases/db";
import { v4 as uuidv4 } from "uuid";
import { validate as uuidValidate } from "uuid";
import { User } from "../types/index.types";

class UsersRouter {
  db: DataBase;
  constructor(db: DataBase) {
    this.db = db;
  }

  respServerError(response: http.ServerResponse) {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "500 Internal Server Error" }));
  }

  getUsers(response: http.ServerResponse) {
    try {
      const users = this.db.getAll();
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(users));
      return;
    } catch (error) {
      this.respServerError(response);
    }
  }

  getUser(response: http.ServerResponse, id: string) {
    try {
      if (!uuidValidate(id)) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: `UserId is invalid` }));
        return;
      }
      const user = this.db.get(id);
      if (user) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(user));
        return;
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({ message: `User with id ${id} doesn't exist` })
        );
        return;
      }
    } catch (error) {
      this.respServerError(response);
    }
  }

  validateUserParams(user: Omit<User, "id">) {
    const userParams = Object.keys(user);

    const isAllParamsProvided = userParams.every((param) => user[param]);

    if (!isAllParamsProvided) {
      return false;
    }

    if (typeof user.age !== "number") {
      return false;
    }

    if (!Array.isArray(user.hobbies)) {
      return false;
    } else {
      const isStrings = user.hobbies.every(
        (element: any) => typeof element === "string"
      );

      if (!isStrings) {
        return false;
      }
    }
    return true;
  }

  addUser(response: http.ServerResponse, body: string) {
    try {
      const userBody = JSON.parse(body);
      const isValidBody = this.validateUserParams(userBody);

      if (!isValidBody) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            message: "Invalid fields content type or fields missed",
          })
        );
        return;
      }

      const id = uuidv4();
      const newUser = {
        id: id,
        username: userBody.username,
        age: userBody.age,
        hobbies: userBody.hobbies,
      };

      this.db.add(newUser);

      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(JSON.stringify(newUser));
      return;
    } catch (error) {
      this.respServerError(response);
    }
  }

  updateUser(response: http.ServerResponse, id: string, body: string) {
    try {
      if (!uuidValidate(id)) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: `UserId is invalid` }));
        return;
      }
      const user = this.db.get(id);
      if (!user) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({ message: `User with id ${id} doesn't exist` })
        );
        return;
      }

      const userBody = JSON.parse(body);
      const isValidBody = this.validateUserParams(userBody);

      if (!isValidBody) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            message: "Invalid fields content type or fields missed",
          })
        );
        return;
      }

      const userToUpdate: User = {
        id: id,
        username: userBody.username,
        age: userBody.age,
        hobbies: userBody.hobbies,
      };
      this.db.update(userToUpdate);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(userToUpdate));
      return;
    } catch (error) {
      this.respServerError(response);
    }
  }

  deleteUser(response: http.ServerResponse, id: string) {
    try {
      if (!uuidValidate(id)) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end({ message: `UserId is invalid` });
        return;
      }

      const user = this.db.get(id);
      if (!user) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({ message: `User with id ${id} doesn't exist` })
        );
        return;
      }

      this.db.delete(id);

      response.writeHead(204, { "Content-Type": "application/json" });
      response.end();
      return;
    } catch (error) {
      this.respServerError(response);
    }
  }
}

export default UsersRouter;
