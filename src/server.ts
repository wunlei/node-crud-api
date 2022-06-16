import http from "http";
import { db } from "./databases/db";
import { usersRouteRegexp } from "./constants/constants";
import UsersRouter from "./router/usersRouter";

const usersRouter = new UsersRouter(db);

const parseRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const respNoSuchRoute = () => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route doesn't exist" }));
  };

  if (req.url) {
    if (req.url === "/api/users") {
      if (req.method === "GET") {
        usersRouter.getUsers(res);
      } else if (req.method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk.toString();
        });
        req.on("end", () => {
          usersRouter.addUser(res, data);
        });
        req.on("error", (error) => {
          console.error(error.message);
        });
      } else {
        respNoSuchRoute();
      }
    } else if (usersRouteRegexp.test(req.url)) {
      const id = req.url.replace("/api/users/", "");
      if (req.method === "GET") {
        usersRouter.getUser(res, id);
      } else if (req.method === "PUT") {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk.toString();
        });
        req.on("end", () => {
          usersRouter.updateUser(res, id, data);
        });
        req.on("error", (error) => {
          console.error(error.message);
        });
      } else if (req.method === "DELETE") {
        usersRouter.deleteUser(res, id);
      } else {
        respNoSuchRoute();
      }
    } else {
      respNoSuchRoute();
    }
  } else {
    respNoSuchRoute();
  }
};

export const server = http.createServer((request, response) => {
  try {
    parseRequest(request, response);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "500 Internal Server Error" }));
  }
});
