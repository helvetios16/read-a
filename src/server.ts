import { Elysia } from "elysia";
import { AuthRoutes } from "./routes/auth/AuthRoutes";
import { jwtAccessSetup } from "./lib/jwt";

export class Server {
  private app: Elysia;

  constructor() {
    this.app = new Elysia();

    // this.setupJWT();
    this.setupRoutes();
  }

  private setupJWT() {
    this.app.use(jwtAccessSetup);
  }

  private setupRoutes() {
    this.app.use(AuthRoutes);
  }

  public start(port: number | string) {
    this.app.listen(port);

    console.log(
      `🦊 Elysia is running at ${this.app.server?.hostname}:${this.app.server?.port}`,
    );
  }
}
