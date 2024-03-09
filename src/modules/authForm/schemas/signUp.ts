import {object, string, ref} from "yup";

export const signUpSchema = object({
  lastName: string().required("Last name is required").max(50), 
  firstName: string().required("First name is required").max(50), 
  password: string().required("Password is required").min(8).max(20),
  email: string().email("Email must be valid").required("Email is required"), 
  confirmPassword: string().required("Please confirm your password").oneOf([ref("password")], "Passwords must match"),
});