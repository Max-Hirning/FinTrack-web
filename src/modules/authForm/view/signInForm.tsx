"use client";

import React from "react";
import Link from "next/link";
import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import {useSignIn} from "../hooks/signIn";
import {signInModel} from "../models/signIn";
import {signInSchema} from "../schemas/signIn";

export function SignInForm() {
  const formik = useFormik({
    initialValues: signInModel,
    validationSchema: signInSchema,
    onSubmit: async (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useSignIn();

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
        onBlur={formik.handleBlur}
        placeholder="example@mail.com"
        errorMsg={formik.errors.email}
        changeText={formik.handleChange}
        value={formik.values.email || ""}
        error={!!(formik.touched.email && formik.errors.email)}
      />
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
      <Link 
        href="/auth/forgot-password"
        aria-label="Forgot password page"
        className="text-end block text-main-auth-pages-link text-main"
      >Forgot password?</Link>
      <ButtonUI
        type="submit"
        variant="contained"
        styles="m-auto h-[50px] w-[190px] mt-[25px]"
        disabled={!formik.isValid || !Object.values(formik.values).some((value: string) => value.length)}
      >Sign in</ButtonUI>
    </form>
  );
}