"use client";

import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import CloseIcon from "@/UI/icons/close";
import React, {ReactElement, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types/store";
import {useDeletePortfolio} from "../hooks/deletePortfolio";
import {useCreatePortfolio} from "../hooks/createPortfolio";
import {useUpdatePortfolio} from "../hooks/updatePortfolio";
import {portfolioFormSchema} from "../schemas/portfolioForm";
import {IPortfolioForm, resetPortfolio} from "@/modules/store";

export function PortfolioForm(): ReactElement {
  const {_id, ...portfolioFormInitialValues} = useSelector((state: RootState) => state.portfolioForm);

  const formik = useFormik({
    validationSchema: portfolioFormSchema,
    initialValues: portfolioFormInitialValues, 
    onSubmit: (data: Omit<IPortfolioForm, "_id">, {resetForm}): void => {
      if(_id.length > 0) {
        updatePortfolio.mutate({...data, _id});
      } else {
        createPortfolio.mutate(data);
      }
      resetForm();
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const createPortfolio = useCreatePortfolio();
  const deletePortfolio = useDeletePortfolio();
  const updatePortfolio = useUpdatePortfolio();
  
  useMemo(() => {
    formik.setValues(portfolioFormInitialValues);
  }, [JSON.stringify(portfolioFormInitialValues)]);

  return (
    <>
      <button 
        title="Cancel card editing"
        onClick={() => dispatch(resetPortfolio())}
        className={`absolute top-[20px] right-[20px] ${_id.length === 0 && "hidden"}`}
      >
        <CloseIcon width={25} height={25} color="#343C6A"/>
      </button>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
        className="flex w-full flex-col gap-[20px] mt-[25px]"
      >
        <InputUI
          id="title"
          type="text"
          label="Card Title"
          placeholder="Cash"
          onBlur={formik.handleBlur}
          value={formik.values.title}
          styles="w-full max-w-[320px]"
          errorMsg={formik.errors.title}
          changeText={formik.handleChange}
          error={!!(formik.touched.title && formik.errors.title)}
        />
        <InputUI
          id="color"
          type="color"
          label="Card Color"
          onBlur={formik.handleBlur}
          value={formik.values.color}
          styles="w-full max-w-[320px]"
          errorMsg={formik.errors.color}
          changeText={formik.handleChange}
          error={!!(formik.touched.color && formik.errors.color)}
        />
        <fieldset className="flex justify-between items-center">
          <ButtonUI
            disabled={
              !(
                formik.isValid &&
              Object.entries(formik.values).every(
                ([key, value]: [string, string | number]) => {
                  if(key === "id") return true;
                  return value.toString().length !== 0;
                }
              )
              )
            }
            type="submit"
            variant="contained"
            styles="w-[150px] h-[40px] rounded-[9px] mt-[20px]"
            title={`${(_id.length > 0) ? "Update" : "Add"} Card`}
          >{(_id.length > 0) ? "Update" : "Add"} Portfolio</ButtonUI>
          <ButtonUI
            type="button"
            color="danger"
            variant="outlined"
            title="Delete card"
            onClick={() => deletePortfolio.mutate()}
            styles={`w-[150px] h-[40px] rounded-[9px] mt-[20px] ${(_id.length === 0) && "hidden"}`}
          >Delete Portfolio</ButtonUI>
        </fieldset>
      </form>
    </>
  );
}
