"use client";

import {useFormik} from "formik";
import {TextUI} from "@/UI/TextUI";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import React, {ReactElement} from "react";
import {useContactUs} from "../hooks/contactUs";
import {contactUsFormSchema} from "../schemas/contactUsFrom";
import {contactUsFromInitialValues} from "../models/contactUsFrom";

export function ContactUsForm(): ReactElement {
  const formik = useFormik({
    validationSchema: contactUsFormSchema, 
    initialValues: contactUsFromInitialValues,
    onSubmit: async (data, {resetForm}): Promise<void> => {
      mutate(data);
      resetForm();
    },
  });
  const {mutate} = useContactUs();

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      className="flex flex-col gap-[20px]"
    >
      <InputUI
        id="title"
        type="test"
        onBlur={formik.handleBlur}
        value={formik.values.title}
        label="Title of the request"
        errorMsg={formik.errors.title}
        changeText={formik.handleChange}
        error={!!(formik.errors.title && formik.errors.title)}
      />
      <TextUI
        id="text"
        onBlur={formik.handleBlur}
        value={formik.values.text}
        label="Text of the request"
        errorMsg={formik.errors.text}
        changeText={formik.handleChange}
        error={!!(formik.errors.text && formik.errors.text)}
      />
      <ButtonUI 
        type="submit"
        variant="contained"
        styles="w-[130px] h-[40px] mt-[20px]"
        disabled={!(formik.isValid && Object.values(formik.values).some((el: string) => el.length > 0))}
      >Send</ButtonUI>
    </form>
  );
}