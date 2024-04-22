"use client";

import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import React, {ReactElement} from "react";
import {ISecurityForm} from "../types/securityForm";
import {useUpdateSecurity} from "../hooks/updateSecurity";
import {securityFormSchema} from "../schemas/securityForm";
import {securityFormInitialValues} from "../models/securityForm";

export function SecurityForm(): ReactElement {
  const formik = useFormik({
    validationSchema: securityFormSchema, 
    initialValues: securityFormInitialValues,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async ({confirmPassword, ...data}: ISecurityForm, {resetForm}): Promise<void> => {
      mutate(data);
      resetForm();
    },
  });
  const {mutate} = useUpdateSecurity();

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      className="flex flex-col gap-[20px]"
    >
      <InputUI
        type="password"
        id="oldPassword"
        label="Current Password"
        onBlur={formik.handleBlur}
        changeText={formik.handleChange}
        value={formik.values.oldPassword}
        errorMsg={formik.errors.oldPassword}
        error={!!(formik.touched.oldPassword && formik.errors.oldPassword)}
      />
      <InputUI
        type="password"
        id="newPassword"
        label="New Password"
        onBlur={formik.handleBlur}
        changeText={formik.handleChange}
        value={formik.values.newPassword}
        errorMsg={formik.errors.newPassword}
        error={!!(formik.touched.newPassword && formik.errors.newPassword)}
      />
      <InputUI
        type="password"
        id="confirmPassword"
        onBlur={formik.handleBlur}
        label="Confirm new password"
        changeText={formik.handleChange}
        value={formik.values.confirmPassword}
        errorMsg={formik.errors.confirmPassword}
        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
      />
      <ButtonUI 
        type="submit"
        variant="contained"
        styles="w-[130px] h-[40px] mt-[20px]"
        disabled={!(formik.isValid && Object.values(formik.values).some((el: string) => el.length > 0))}
      >Save</ButtonUI>
    </form>
  );
}