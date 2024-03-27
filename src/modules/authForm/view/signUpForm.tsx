"use client";

import Link from "next/link";
import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import {useSignUp} from "../hooks/signUp";
import {signUpModel} from "../models/signUp";
import {signUpSchema} from "../schemas/signUp";
import React, {ReactElement, useState} from "react";

export function SignUpForm(): ReactElement {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
        autoComplete="given-name"
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
        autoComplete="family-name"
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
        autoComplete="email"
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
          id="privacyPolicy"
          onChange={handleChange}
          checked={agreedToPolicy}
          className="w-[16px] h-[16px]"
        />
        <label 
          htmlFor="privacyPolicy"
          className=" ml-[10px] text-[14px] text-text"
        >
          I&lsquo;ve read <Link 
            href="/privacy-policy"
            aria-label="Privacy policy page"
            className="text-main text-[14px]"
          >privacy policy</Link> and agree
        </label>
      </fieldset>
      <ButtonUI
        type="submit"
        title="Sign up"
        variant="contained"
        styles="m-auto h-[50px] w-[190px] mt-[25px]"
        disabled={!formik.isValid || !agreedToPolicy || !Object.values(formik.values).some((value: string) => value.length)}
      >Sign up</ButtonUI>
    </form>
  );
}