export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  role: Role;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

export type IUserPublic = Omit<IUser, "password" | "role">;
export type IUserBody = Omit<IUser, "id" | "role">;
