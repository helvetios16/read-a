import { Elysia } from "elysia";
import { AuthController } from "../../controllers/auth/AuthController";
import { IUserBody } from "../../interfaces/IUser";
import { ErrorMessage } from "../../models/ErrorMessageModel";

export const AuthRoutes = new Elysia({ prefix: "/auth" });

AuthRoutes.post("/register", async ({ body, set }) => {
  const result = await AuthController.createUser(body as IUserBody);

  if (result instanceof ErrorMessage) {
    set.status = result.code;
    return result.toJSON();
  }

  return result.toJSON();
});
