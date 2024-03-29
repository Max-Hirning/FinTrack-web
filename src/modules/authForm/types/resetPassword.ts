import {ISignUp} from "./signUp";

export interface IResetPassword extends Pick<ISignUp, "password"|"confirmPassword"> {}