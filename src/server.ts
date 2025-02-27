import { Elysia } from "elysia";
import { AuthRoutes } from "./routes/auth/AuthRoutes";

export class Server {
  private app: Elysia;

  constructor() {
    this.app = new Elysia();
    this.setupRoutes();
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
