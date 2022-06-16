import "dotenv/config";
import { DEFAULT_PORT } from "./constants/constants";
import { server } from "./server";

const port = process.env.PORT || DEFAULT_PORT;

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
