import { Elysia } from "elysia";
import { AuthRoutes } from "./routes/auth/AuthRoutes";
import { jwt } from "@elysiajs/jwt";

export class Server {
  private app: Elysia;

  constructor() {
    this.app = new Elysia();

    this.setupJWT();
    this.setupRoutes();
  }

  private setupJWT() {
    this.app.use(
      jwt({
        name: "jwt",
        secret: process.env.SECRET_KEY,
        exp: "5m",
      }),
    );
  }

  private setupRoutes() {
    AuthRoutes(this.app);
  }

  public start(port: number | string) {
    this.app.listen(port);

    console.log(
      `🦊 Elysia is running at ${this.app.server?.hostname}:${this.app.server?.port}`,
    );
  }
}
