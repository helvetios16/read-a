import { IUserPublic } from "../interfaces/IUser";

export class UserPublicModel implements IUserPublic {
  readonly id: string;
  name: string;
  email: string;
  age: number;

  constructor(id: string, name: string, email: string, age: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
    };
  }
}
