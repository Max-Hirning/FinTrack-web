"use client";

import React from "react";
import Link from "next/link";
import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
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
        className="text-end block text-main-auth-pages-link text-main"
      >Forgot password?</Link>
      <button 
        type="submit"
        disabled={!formik.isValid || !Object.values(formik.values).some((value: string) => value.length)}
        className="text-white m-auto h-[50px] w-[190px] rounded-[15px] flex items-center justify-center mt-[25px] cursor-pointer disabled:bg-disabled bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >Sign in</button>
    </form>
  );
}