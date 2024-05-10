import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {IPortfolioForm} from "../types/portfolioForm";
import {portfolioFormInitialValues} from "../models/portfolioForm";

export const portfolioFormSlice = createSlice({
  name: "portfolioForm",
  initialState: portfolioFormInitialValues,
  reducers: {
    resetPortfolio: (): IPortfolioForm => {
      return portfolioFormInitialValues;
    },
    setPortfolio: (_: IPortfolioForm, {payload}: PayloadAction<IPortfolioForm>): IPortfolioForm => {
      return payload;
    },
  },
});

export const {resetPortfolio, setPortfolio} = portfolioFormSlice.actions;

export const portfolioFormReducer = portfolioFormSlice.reducer;