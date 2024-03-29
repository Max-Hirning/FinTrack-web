"use client";

import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import React, {ReactElement} from "react";
import {useForgotPassword} from "../hooks/forgotPassword";
import {forgotPasswordModel} from "../models/forgotPassword";
import {forgotPasswordSchema} from "../schemas/forgotPassword";

export function ForgotPasswordForm(): ReactElement {
  const formik = useFormik({
    initialValues: forgotPasswordModel,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useForgotPassword();

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      className="max-w-[450px] w-full flex flex-col gap-[20px]"
    >
      <InputUI
        id="email"
        type="email"
        label="Email"
        required={true}
        autoComplete="email"
        onBlur={formik.handleBlur}
        placeholder="example@mail.com"
        errorMsg={formik.errors.email}
        changeText={formik.handleChange}
        value={formik.values.email || ""}
        error={!!(formik.touched.email && formik.errors.email)}
      />
      <ButtonUI
        type="submit"
        title="Sign in"
        variant="contained"
        styles="m-auto h-[50px] w-[190px] mt-[25px]"
        disabled={!formik.isValid || !Object.values<string>(formik.values).some((value: string) => value.length)}
      >Reset password</ButtonUI>
    </form>
  );
}