import { Elysia } from "elysia";
import { AuthController } from "../../controllers/auth/AuthController";
import { IUserBody, IUserLogin } from "../../interfaces/IUser";
import { ErrorMessage } from "../../models/ErrorMessageModel";
import { jwtAccessSetup } from "../../lib/jwt";
import { bodyLoginModel, bodyRegisterModel } from "../../lib/t";

export const AuthRoutes = new Elysia()
  .use(jwtAccessSetup)
  .group("/auth", (auth) =>
    auth
      .post(
        "/register",
        async ({ body, set }) => {
          const result = await AuthController.createUser(body as IUserBody);

          if (result instanceof ErrorMessage) {
            set.status = result.code;
          }

          return result.toJSON();
        },
        bodyRegisterModel,
      )
      .post(
        "/login",
        async ({ jwt, body, set, cookie: { auth } }) => {
          const result = await AuthController.login(body as IUserLogin);

          if (result instanceof ErrorMessage) {
            set.status = result.code;
            return result.toJSON();
          }

          auth.set({
            value: await jwt.sign({ id: result.id }),
            httpOnly: true,
          });

          return result.toJSON();
        },
        bodyLoginModel,
      ),
  );
