import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = string;

const initialState: State = "";

export const slice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<State>) => action.payload,
  },
});

export const { setDate } = slice.actions;
export default slice.reducer;
