"use client";

import {useFormik} from "formik";
import React, {useMemo} from "react";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import {SelectUI} from "@/UI/SelectUI";
import CloseIcon from "@/UI/icons/close";
import {ICategory} from "@/types/category";
import {IUserSession} from "@/modules/profile";
import {resetTransaction} from "@/modules/store";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types/store";
import {useGetCategories} from "@/hooks/getCategories";
import {useGetCards} from "@/modules/cards/hooks/getCards";
import {ICardResponse, ICardsFilters} from "@/modules/cards";
import {transactionFormSchema} from "../schemas/transactionForm";

interface IProps {
  session: IUserSession;
  filters: Pick<ICardsFilters, "ownerId">;
}

export function TransactionForm({filters, session}: IProps) {
  const {_id, ...transactionFormInitialValues} = useSelector((state: RootState) => state.transactionForm);
  const formik = useFormik({
    validationSchema: transactionFormSchema,
    initialValues: transactionFormInitialValues, 
    onSubmit: (data, {resetForm}): void => {
      console.log(data);
      resetForm();
    },
  });
  const categories = useGetCategories();
  // const deleteCard = useDeleteCard();
  const dispatch: AppDispatch = useDispatch();
  const cards = useGetCards(filters, session.jwt);

  useMemo(() => {
    formik.setValues(transactionFormInitialValues);
  }, [JSON.stringify(transactionFormInitialValues)]);

  return (
    <>
      <button 
        onClick={() => dispatch(resetTransaction())}
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
        <fieldset className="flex max-lg:flex-col gap-[25px]">
          <InputUI
            id="date"
            type="date"
            label="Transaction Date"
            onBlur={formik.handleBlur}
            value={formik.values.date}
            styles="w-full max-w-[320px]"
            errorMsg={formik.errors.date}
            changeText={formik.handleChange}
            error={!!(formik.errors.date && formik.errors.date)}
          />
          <SelectUI
            type="text"
            id="categoryId"
            inputStyles="hidden"
            listId="categoryId"
            onBlur={formik.handleBlur}
            label="Transaction Category"
            styles="w-full max-w-[320px]"
            value={formik.values.categoryId}
            changeText={formik.handleChange}
            errorMsg={formik.errors.categoryId}
            error={!!(formik.errors.categoryId && formik.errors.categoryId)}
          >
            <select 
              id="categoryId"
              onChange={formik.handleChange}
              value={formik.values.categoryId}
              className="focus:outline-none shadow-sm focus:border-[#DFEAF2] focus:ring-1 focus:ring-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] text-[#718EBF] h-[50px] border border-[#DFEAF2] w-full p-[15px]"
            >
              <option value="" disabled>Choose the transaction category</option>
              {
                (categories.data?.data || []).map(({_id, children, title}: ICategory) => {
                  if(children.length === 0) {
                    return (
                      <option 
                        key={_id}
                        value={_id}
                      >{title}</option>
                    );
                  } else {
                    return (
                      <optgroup 
                        key={_id}
                        label={title}
                      >
                        {
                          children.map((el: ICategory) => {
                            return (
                              <option
                                key={el._id}
                                value={el._id}
                              >{el.title}</option>
                            );
                          })
                        }
                      </optgroup>
                    );
                  }
                })
              }
            </select>
          </SelectUI>
        </fieldset>
        <fieldset className="flex max-lg:flex-col gap-[25px]">
          <SelectUI
            type="text"
            id="cardId"
            listId="cardId"
            inputStyles="hidden"
            label="Transaction Card"
            onBlur={formik.handleBlur}
            value={formik.values.cardId}
            styles="w-full max-w-[320px]"
            errorMsg={formik.errors.cardId}
            changeText={formik.handleChange}
            error={!!(formik.errors.cardId && formik.errors.cardId)}
          >
            <select 
              id="cardId"
              value={formik.values.cardId}
              onChange={formik.handleChange}
              className="focus:outline-none shadow-sm focus:border-[#DFEAF2] focus:ring-1 focus:ring-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] text-[#718EBF] h-[50px] border border-[#DFEAF2] w-full p-[15px]"
            >
              <option value="" disabled>Choose the transaction card</option>
              {
                (cards.data?.data?.cards || []).map(({_id, title}: ICardResponse) => {
                  return (
                    <option 
                      key={_id}
                      value={_id}
                    >{title}</option>
                  );
                })
              }
            </select>
          </SelectUI>
          <InputUI
            id="amount"
            type="number"
            label="Transaction Amount"
            onBlur={formik.handleBlur}
            styles="w-full max-w-[320px]"
            errorMsg={formik.errors.amount}
            changeText={formik.handleChange}
            value={formik.values.amount.toString() || ""}
            error={!!(formik.errors.amount && formik.errors.amount)}
          />
        </fieldset>
        <fieldset>
          <InputUI
            type="text"
            styles="w-full"
            id="description"
            onBlur={formik.handleBlur}
            label="Transaction Description"
            changeText={formik.handleChange}
            value={formik.values.description}
            errorMsg={formik.errors.description}
            error={!!(formik.errors.description && formik.errors.description)}
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eos dolorem unde, dignissimos odit et. Beatae doloremque facere expedita tempore? Nobis esse nemo facilis nihil fugit deserunt quia amet voluptate."
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
            styles="w-[150px] h-[40px] rounded-[9px] mt-[20px]"
          >{(_id.length > 0) ? "Update" : "Add"} Transaction</ButtonUI>
          <ButtonUI
            type="button"
            color="danger"
            variant="outlined"
            // onClick={() => deleteCard.mutate()}
            styles={`w-[150px] h-[40px] rounded-[9px] mt-[20px] ${(_id.length === 0) && "hidden"}`}
          >Delete Transaction</ButtonUI>
        </fieldset>
      </form>
    </>
  );
}
