"use client";

import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import React, {ReactElement} from "react";
import {useResetPassword} from "../hooks/resetPassword";
import {resetPasswordModel} from "../models/resetPassword";
import {resetPasswordSchema} from "../schemas/resetPassword";

interface IProps {
  code: string;
}

export function ResetPasswordForm({code}: IProps): ReactElement {
  const formik = useFormik({
    initialValues: resetPasswordModel,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useResetPassword(code);

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      className="max-w-[450px] w-full flex flex-col gap-[20px]"
    >
      <InputUI
        id="password"
        type="password"
        required={true}
        label="Password"
        onBlur={formik.handleBlur}
        changeText={formik.handleChange}
        errorMsg={formik.errors.password}
        value={formik.values.password || ""}
        error={!!(formik.touched.password && formik.errors.password)}
      />
      <InputUI
        type="password"
        required={true}
        id="confirmPassword"
        label="Confirm password"
        onBlur={formik.handleBlur}
        changeText={formik.handleChange}
        errorMsg={formik.errors.confirmPassword}
        value={formik.values.confirmPassword || ""}
        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
      />
      <ButtonUI
        type="submit"
        title="Reset password"
        variant="contained"
        styles="m-auto h-[50px] w-[190px] mt-[25px]"
        disabled={!formik.isValid || !(Object.values<string>(formik.values).some((value: string) => value.length))}
      >Reset password</ButtonUI>
    </form>
  );
}