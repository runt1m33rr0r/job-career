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

export const makeRequest = ({
  requestFunction,
  successAction,
  failAction,
  requestData,
  shouldAlert = true
}) => async dispatch => {
  const dispatchStopFetch = requestResponse => {
    if (shouldAlert) {
      dispatch(stopFetching(requestResponse));
    } else {
      dispatch(stopFetching({ success: requestResponse.success, message: "" }));
    }
  };

  try {
    dispatch(startFetching());

    const requestResponse = await requestFunction(requestData);

    dispatchStopFetch(requestResponse);

    if (successAction && requestResponse.success) {
      dispatch(successAction({ ...requestData, ...requestResponse }));
    } else if (failAction) {
      dispatch(failAction());
    }
  } catch (error) {
    dispatchStopFetch({ success: false, message: error });

    if (failAction) {
      dispatch(failAction());
    }
  }
};
