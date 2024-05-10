import {configureStore} from "@reduxjs/toolkit";
import {cardFormReducer, transactionFormReducer, portfolioFormReducer} from "@/modules/store";

export const store = configureStore({
  reducer: {
    cardForm: cardFormReducer,
    portfolioForm: portfolioFormReducer,
    transactionForm: transactionFormReducer,
  },
});
