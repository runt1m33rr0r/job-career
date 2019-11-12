import { createSlice } from "redux-starter-kit";

const networkSlice = createSlice({
  name: "network",
  initialState: { isFetching: false, error: "", success: "" },
  reducers: {
    startFetching: state => {
      state.isFetching = true;
    },
    stopFetching: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
      state.success = action.payload.success;
    }
  }
});

export const { startFetching, stopFetching } = networkSlice.actions;

export default networkSlice.reducer;
