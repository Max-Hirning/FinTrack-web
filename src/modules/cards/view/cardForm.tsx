"use client";

import React from "react";
import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import {ICardForm} from "../types/cardForm";
import {ICurrency} from "@/types/currency";
import {useCreateCard} from "../hooks/createCard";
import {SearchSelectUI} from "@/UI/SeacrhSelectUI";
import {cardFormSchema} from "../schemas/cardForm";
import {useGetCurrencies} from "@/hooks/getCurrencies";
import {cardFormInitialValues} from "../models/cardForm";

export function CardForm() {
  const formik = useFormik({
    validationSchema: cardFormSchema,
    initialValues: cardFormInitialValues, 
    onSubmit: ({balance, ...data}: ICardForm, {resetForm}): void => {
      createCard.mutate({...data, balance});
      console.log(data, balance);
      resetForm();
    },
  });
  const {data} = useGetCurrencies();
  const createCard = useCreateCard();

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      className="flex w-full flex-col gap-[20px] mt-[25px]"
    >
      <fieldset className="flex max-lg:flex-col gap-[25px]">
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
          error={!!(formik.errors.title && formik.errors.title)}
        />
        <SearchSelectUI
          type="text"
          id="currency"
          label="Card Currency"
          listId="currencies-list"
          onBlur={formik.handleBlur}
          styles="w-full max-w-[320px]"
          value={formik.values.currency}
          changeText={formik.handleChange}
          errorMsg={formik.errors.currency}
          error={!!(formik.errors.currency && formik.errors.currency)}
        >
          <datalist id="currencies-list">
            {
              (data?.data || []).map(({code, name}: ICurrency) => {
                return (
                  <option 
                    key={code}
                    value={code} 
                  >{name}</option>
                );
              })
            }
          </datalist>
        </SearchSelectUI>
      </fieldset>
      <fieldset className="flex max-lg:flex-col gap-[25px]">
        <InputUI
          id="balance"
          type="number"
          label="Card Balance"
          onBlur={formik.handleBlur}
          styles="w-full max-w-[320px]"
          errorMsg={formik.errors.balance}
          changeText={formik.handleChange}
          value={formik.values.balance.toString() || ""}
          error={!!(formik.errors.balance && formik.errors.balance)}
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
          error={!!(formik.errors.color && formik.errors.color)}
        />
      </fieldset>
      <ButtonUI
        disabled={
          !(
            formik.isValid &&
            (Object.values(formik.values) as Array<string | number>).every(
              (el: string | number) => {
                return el.toString().length !== 0;
              }
            )
          )
        }
        type="submit"
        text="Add Card"
        variant="contained"
        styles="w-[130px] h-[40px] rounded-[9px] mt-[20px]"
      />
    </form>
  );
}