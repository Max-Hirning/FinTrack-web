import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {ITransactionForm} from "../types/transactionForm";
import {transactionFormInitialValues} from "../models/transactionForm";

export const transactionFormSlice = createSlice({
  name: "transactionForm",
  initialState: transactionFormInitialValues,
  reducers: {
    resetTransaction: (): ITransactionForm => {
      return transactionFormInitialValues;
    },
    setTransction: (_: ITransactionForm, {payload}: PayloadAction<ITransactionForm>): ITransactionForm => {
      return payload;
    },
  },
});

export const {setTransction, resetTransaction} = transactionFormSlice.actions;

export const transactionFormReducer = transactionFormSlice.reducer;