"use client";

import Link from "next/link";
import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import React, {useState} from "react";
import {ButtonUI} from "@/UI/ButtonUI";
import {useSignUp} from "../hooks/signUp";
import {signUpModel} from "../models/signUp";
import {signUpSchema} from "../schemas/signUp";

export function SignUpForm() {
  const formik = useFormik({
    initialValues: signUpModel,
    validationSchema: signUpSchema,
    onSubmit: async (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useSignUp();
  const [agreedToPolicy, setAgreedToPolicy] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToPolicy(event.target.checked);
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      className="max-w-[450px] w-full flex flex-col gap-[20px]"
    >
      <InputUI
        type="text"
        id="firstName"
        required={true}
        label="First name"
        placeholder="Otto"
        onBlur={formik.handleBlur}
        changeText={formik.handleChange}
        errorMsg={formik.errors.firstName}
        value={formik.values.firstName || ""}
        error={!!(formik.touched.firstName && formik.errors.firstName)}
      />
      <InputUI
        type="text"
        id="lastName"
        required={true}
        label="Last name"
        placeholder="Melnburg"
        onBlur={formik.handleBlur}
        changeText={formik.handleChange}
        errorMsg={formik.errors.lastName}
        value={formik.values.lastName || ""}
        error={!!(formik.touched.lastName && formik.errors.lastName)}
      />
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
      <fieldset className="flex flex-row items-center mb-[10px]">
        <input 
          type="checkbox"
          onChange={handleChange}
          checked={agreedToPolicy}
          className="w-[16px] h-[16px]"
        />
        <Link 
          href="/privacy-policy"
          aria-label="Privacy policy page"
          className="text-main ml-[5px] text-[14px]"
        >I&lsquo;ve read privacy policy and agree</Link>
      </fieldset>
      <ButtonUI
        type="submit"
        variant="contained"
        styles="m-auto h-[50px] w-[190px] mt-[25px]"
        disabled={!formik.isValid || !agreedToPolicy || !Object.values(formik.values).some((value: string) => value.length)}
      >Sign up</ButtonUI>
    </form>
  );
}