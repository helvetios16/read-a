import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";

export const jwtAccessSetup = new Elysia({
  name: "jwt",
}).use(
  jwt({
    name: "jwt",
    secret: process.env.SECRET_KEY,
    exp: "5m",
  }),
);
