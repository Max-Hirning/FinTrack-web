import {configureStore} from "@reduxjs/toolkit";
import {cardFormReducer, transactionFormReducer} from "@/modules/store";

export const store = configureStore({
  reducer: {
    cardForm: cardFormReducer,
    transactionForm: transactionFormReducer,
  },
});
