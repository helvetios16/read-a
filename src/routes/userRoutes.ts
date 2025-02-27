import { Elysia } from "elysia";
import { UserController } from "../controllers/UserController";

export const userRoutes = new Elysia({ prefix: "/users" });

userRoutes.post("/", ({ body }) => {
  const user = body as IUserBody;
  return UserController.createUser(user);
});

userRoutes.get("/all", () => {
  return UserController.getUsers();
});
