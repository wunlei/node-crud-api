import http from "http";

export const server = http.createServer((request, response) => {
  try {
    console.log(request.url);
    console.log(request.method);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end();
  } catch (error) {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "500 Internal Server Error" }));
  }
});
