import {configureStore} from "@reduxjs/toolkit";
import {cardFormReducer} from "@/modules/store";

export const store = configureStore({
  reducer: {
    cardForm: cardFormReducer
  },
});
