import { createSlice } from "@reduxjs/toolkit";

const networkSlice = createSlice({
  name: "network",
  initialState: { isFetching: false, success: true, message: "" },
  reducers: {
    startFetching: state => {
      state.isFetching = true;
    },
    stopFetching: (state, action) => {
      state.isFetching = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    disableMessage: state => {
      state.message = "";
    }
  }
});

export const {
  startFetching,
  stopFetching,
  disableMessage
} = networkSlice.actions;

export default networkSlice.reducer;

export const makeRequest = (
  requestFunction,
  requestData,
  successAction,
  failAction
) => async dispatch => {
  try {
    dispatch(startFetching());

    const requestResponse = await requestFunction(requestData);

    dispatch(stopFetching(requestResponse));

    if (requestResponse.success) {
      dispatch(successAction(requestData));
    } else {
      dispatch(failAction());
    }
  } catch (error) {
    dispatch(stopFetching({ success: false, message: error }));
    dispatch(failAction());
  }
};
