import {ISignIn} from "./signIn";

export interface ISignUp extends ISignIn {
  lastName: string;
  firstName: string;
  confirmPassword: string;
}