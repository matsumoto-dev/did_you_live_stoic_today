import { configureStore } from "@reduxjs/toolkit";
import DateReducer from "@/features/date/slice";

export const store = configureStore({
  reducer: {
    Date: DateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
