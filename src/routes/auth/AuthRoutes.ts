import { Elysia } from "elysia";
import { AuthController } from "../../controllers/auth/AuthController";
import { IUserBody } from "../../interfaces/IUser";
import { ErrorMessage } from "../../models/ErrorMessageModel";
import { jwtAccessSetup } from "../../lib/jwt";

export const AuthRoutes = new Elysia()
  .use(jwtAccessSetup)
  .group("/auth", (auth) =>
    auth
      .post("/register", async ({ body, set }) => {
        if (!body || typeof body !== "object") {
          set.status = 400;
          return { message: "Invalid request body" };
        }

        const result = await AuthController.createUser(body as IUserBody);

        if (result instanceof ErrorMessage) {
          set.status = result.code;
        }

        return result.toJSON();
      })
      .post("/login", async ({ jwt, body, set, cookie: { auth } }) => {
        const result = await AuthController.login(body as IUserBody);

        if (result instanceof ErrorMessage) {
          set.status = result.code;
          return result.toJSON();
        }

        const token = await jwt.sign({ id: result.id });

        auth.set({
          value: token,
          httpOnly: true,
        });

        return result.toJSON();
      }),
  );
