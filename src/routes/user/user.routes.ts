import { Elysia } from "elysia";
import { jwtAccessSetup } from "../../lib/jwt";

export const UserRoutes = new Elysia()
  .use(jwtAccessSetup)
  .group("/user", (user) => {
    return user;
  });
