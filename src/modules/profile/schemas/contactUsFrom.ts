import {object, string} from "yup";

export const contactUsFormSchema = object().shape({
  text: string().required("Text is required"),
  title: string().required("Title is required"),
});