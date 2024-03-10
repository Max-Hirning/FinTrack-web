import {ICardForm} from "../types/cardForm";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {cardFormInitialValues} from "../models/cardForm";

export const cardFormSlice = createSlice({
  name: "cardForm",
  initialState: cardFormInitialValues,
  reducers: {
    resetCard: (): ICardForm => {
      return cardFormInitialValues;
    },
    setCard: (_: ICardForm, {payload}: PayloadAction<ICardForm>): ICardForm => {
      return payload;
    },
  },
});

export const {resetCard, setCard} = cardFormSlice.actions;

export const cardFormReducer = cardFormSlice.reducer;