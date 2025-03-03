import { t } from "elysia";

export const bodyRegisterModel = {
  body: t.Object(
    {
      name: t.String(),
      email: t.String(),
      password: t.String(),
      age: t.Number(),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const bodyLoginModel = {
  body: t.Object(
    {
      email: t.String(),
      password: t.String(),
    },
    { additionalProperties: false },
  ),
};
