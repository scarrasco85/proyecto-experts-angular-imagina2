import { IUser } from "./iuser.interface";

export class User  implements IUser{
  username: string | undefined;
  email: string;
  password: string;

  constructor(email: string, password: string, username: string) {
    this.email = email
    this.password = password
    this.username = username
  }
}
