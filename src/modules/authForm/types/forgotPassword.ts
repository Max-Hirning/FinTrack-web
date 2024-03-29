import {ISignUp} from "./signUp";

export interface IForgotPassword extends Pick<ISignUp, "email"> {}