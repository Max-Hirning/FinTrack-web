"use client";

import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import {SelectUI} from "@/UI/SelectUI";
import CloseIcon from "@/UI/icons/close";
import {IUserSession} from "@/modules/profile";
import React, {ReactElement, useMemo} from "react";
import {ICategoryResponse} from "@/types/category";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types/store";
import {useGetCards} from "@/modules/cards/hooks/getCards";
import {ICardResponse, ICardsFilters} from "@/modules/cards";
import {useDeleteTransaction} from "../hooks/deleteTransaction";
import {useCreateTransaction} from "../hooks/createTransaction";
import {useUpdateTransaction} from "../hooks/updateTransaction";
import {transactionFormSchema} from "../schemas/transactionForm";
import {ITransactionForm, resetTransaction} from "@/modules/store";

interface IProps {
  session: IUserSession;
  filters: ICardsFilters;
  categories: ICategoryResponse[];
}

export function TransactionForm({filters, session, categories}: IProps): ReactElement {
  const {_id, ...transactionFormInitialValues} = useSelector((state: RootState) => state.transactionForm);
  const formik = useFormik({
    validationSchema: transactionFormSchema,
    initialValues: transactionFormInitialValues, 
    onSubmit: ({...data}: Omit<ITransactionForm, "_id">, {resetForm}): void => {
      const dateObject = new Date(data.date);
      const currentTime = new Date();
      dateObject.setHours(currentTime.getHours());
      dateObject.setMinutes(currentTime.getMinutes());
      dateObject.setSeconds(currentTime.getSeconds());
      dateObject.setMilliseconds(currentTime.getMilliseconds());
      const isoDate = dateObject.toISOString();
      if(_id.length === 0) {
        createTransaction.mutate({...data, date: isoDate});
      } else {
        updateTransaction.mutate({...data, date: isoDate, _id});
      }
      resetForm();
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const cards = useGetCards(filters, session.jwt);
  const deleteTransaction = useDeleteTransaction();
  const updateTransaction = useUpdateTransaction();
  const createTransaction = useCreateTransaction();

  useMemo(() => {
    formik.setValues(transactionFormInitialValues);
  }, [JSON.stringify(transactionFormInitialValues)]);

  return (
    <>
      <button 
        title="Close edit transaction form"
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
            errorMsg={formik.errors.date}
            changeText={formik.handleChange}
            styles="w-full lg:max-w-[320px]"
            maxDate={new Date().toISOString().split("T")[0]}
            error={!!(formik.touched.date && formik.errors.date)}
          />
          <SelectUI
            type="text"
            listId="categoryId"
            id="categoryIdInput"
            inputStyles="hidden"
            onBlur={formik.handleBlur}
            label="Transaction Category"
            styles="w-full lg:max-w-[320px]"
            value={formik.values.categoryId}
            changeText={formik.handleChange}
            errorMsg={formik.errors.categoryId}
            error={!!(formik.touched.categoryId && formik.errors.categoryId)}
          >
            <select 
              id="categoryId"
              onChange={(e) => {
                formik.handleChange(e);
                const selectedOption = e.target.options[e.target.selectedIndex];
                const selectedTitle = selectedOption.getAttribute("data-title");
                formik.setFieldValue("description", selectedTitle);
              }}
              title="Transaction categories"
              value={formik.values.categoryId}
              className="focus:outline-none shadow-sm focus:border-[#DFEAF2] focus:ring-1 focus:ring-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] text-[#718EBF] h-[50px] border border-[#DFEAF2] w-full p-[15px]"
            >
              <option value="" disabled>Choose the transaction category</option>
              {
                categories.map(({_id, children, title}: ICategoryResponse) => {
                  if(children.length === 0) {
                    return (
                      <option 
                        key={_id}
                        value={_id}
                        data-title={title}
                      >{title}</option>
                    );
                  } else {
                    return (
                      <optgroup 
                        key={_id}
                        label={title}
                        data-title={title}
                      >
                        {
                          children.map((el: ICategoryResponse) => {
                            return (
                              <option
                                key={el._id}
                                value={el._id}
                                data-title={el.title}
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
            listId="cardId"
            id="cardIdInput"
            inputStyles="hidden"
            label="Transaction Card"
            onBlur={formik.handleBlur}
            value={formik.values.cardId}
            errorMsg={formik.errors.cardId}
            styles="w-full lg:max-w-[320px]"
            changeText={formik.handleChange}
            error={!!(formik.touched.cardId && formik.errors.cardId)}
          >
            <select 
              id="cardId"
              title="Transaction cards"
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
            errorMsg={formik.errors.amount}
            changeText={formik.handleChange}
            styles="w-full lg:max-w-[320px]"
            value={formik.values.amount.toString() || ""}
            error={!!(formik.touched.amount && formik.errors.amount)}
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
            error={!!(formik.touched.description && formik.errors.description)}
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
                  if(key === "id") return true;
                  return value.toString().length !== 0;
                }
              )
              )
            }
            type="submit"
            variant="contained"
            styles="w-[175px] h-[40px] rounded-[9px] mt-[20px]"
          >{(_id.length > 0) ? "Update" : "Add"} Transaction</ButtonUI>
          <ButtonUI
            type="button"
            color="danger"
            variant="outlined"
            onClick={() => deleteTransaction.mutate()}
            styles={`w-[175px] h-[40px] rounded-[9px] mt-[20px] ${(_id.length === 0) && "hidden"}`}
          >Delete Transaction</ButtonUI>
        </fieldset>
      </form>
    </>
  );
}
