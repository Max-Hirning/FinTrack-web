"use client";

import {useFormik} from "formik";
import React, {useMemo} from "react";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import CloseIcon from "@/UI/icons/close";
import {ICurrency} from "@/types/currency";
import {useUpdateCard} from "../hooks/updateCard";
import {useCreateCard} from "../hooks/createCard";
import {useDeleteCard} from "../hooks/deleteCard";
import {SearchSelectUI} from "@/UI/SeacrhSelectUI";
import {cardFormSchema} from "../schemas/cardForm";
import {ICardForm, resetCard} from "@/modules/store";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types/store";
import {useGetCurrencies} from "@/hooks/getCurrencies";

export function CardForm() {
  const {id, ...cardFormInitialValues} = useSelector((state: RootState) => state.cardForm);

  const formik = useFormik({
    validationSchema: cardFormSchema,
    initialValues: cardFormInitialValues, 
    onSubmit: (data: Omit<ICardForm, "id">, {resetForm}): void => {
      if(id.length > 0) {
        updateCard.mutate({...data, id});
      } else {
        createCard.mutate(data);
      }
      resetForm();
    },
  });
  const {data} = useGetCurrencies();
  const updateCard = useUpdateCard();
  const createCard = useCreateCard();
  const deleteCard = useDeleteCard();
  const dispatch: AppDispatch = useDispatch();
  
  useMemo(() => {
    formik.setValues(cardFormInitialValues);
  }, [JSON.stringify(cardFormInitialValues)]);

  return (
    <>
      <button 
        onClick={() => dispatch(resetCard())}
        className={`absolute top-[20px] right-[20px] ${id.length === 0 && "hidden"}`}
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
            disabled={id.length > 0}
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
        <fieldset className="flex justify-between items-center">
          <ButtonUI
            disabled={
              !(
                formik.isValid &&
              Object.entries(formik.values).every(
                ([key, value]: [string, string | number]) => {
                  if (key === "id") return true;
                  return value.toString().length !== 0;
                }
              )
              )
            }
            type="submit"
            variant="contained"
            styles="w-[130px] h-[40px] rounded-[9px] mt-[20px]"
          >{(id.length > 0) ? "Update" : "Add"} Card</ButtonUI>
          <ButtonUI
            type="button"
            color="danger"
            variant="outlined"
            onClick={() => deleteCard.mutate()}
            styles={`w-[130px] h-[40px] rounded-[9px] mt-[20px] ${(id.length === 0) && "hidden"}`}
          >Delete Card</ButtonUI>
        </fieldset>
      </form>
    </>
  );
}