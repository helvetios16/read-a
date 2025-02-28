import { Elysia } from "elysia";
import { AuthController } from "../../controllers/auth/AuthController";
import { IUserBody } from "../../interfaces/IUser";
import { ErrorMessage } from "../../models/ErrorMessageModel";

export const AuthRoutes = (app: Elysia) => {
  app.group("/auth", (auth) => {
    auth.post("/register", async ({ body, set }) => {
      const result = await AuthController.createUser(body as IUserBody);

      if (result instanceof ErrorMessage) {
        set.status = result.code;
      }

      return result.toJSON();
    });

    auth.post("/login", async ({ jwt, body, set, cookie: { auth } }) => {
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

      console.log(token);

      return result.toJSON();
    });

    return auth;
  });
};
