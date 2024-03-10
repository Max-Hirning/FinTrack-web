import {object, string} from "yup";

export const securityFormSchema = object().shape({
  newPassword: string().required("New password is required").max(20, "Max length is 20 chars").min(8, "Min length is 8 chars"),
  oldPassword: string().required("Current password is required").max(20, "Max length is 20 chars").min(8, "Min length is 8 chars"),
  confirmPassword: string().required("Confirm your new password").max(20, "Max length is 20 chars").min(8, "Min length is 8 chars").test("passwords-match", "Passwords must match", function (value) {
    return this.parent.newPassword === value;
  }),
});