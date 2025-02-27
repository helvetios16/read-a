import { Server } from "./server";

const server = new Server();
const PORT = process.env.PORT || 3000;
server.start(PORT);
