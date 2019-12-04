import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import {
  createNotice,
  editNotice,
  getCompanyNotices,
  deleteNotice
} from "./noticesApi";

const noticesSlice = createSlice({
  name: "notices",
  initialState: {
    notices: []
  },
  reducers: {
    getAllNoticesSuccess: (state, action) => {
      state.notices = action.payload.notices;
    }
  }
});

export const { getAllNoticesSuccess } = noticesSlice.actions;

export default noticesSlice.reducer;

export const getCompanyNoticesRequest = () => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: getCompanyNotices,
      requestData: { company: getState().auth.companyName },
      successAction: getAllNoticesSuccess,
      shouldAlert: false
    })
  );

export const createNoticeRequest = noticeData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: createNotice,
      requestData: { ...noticeData, companyName: getState().auth.companyName }
    })
  );

export const editNoticeRequest = noticeData => async dispatch =>
  dispatch(
    makeRequest({ requestFunction: editNotice, requestData: noticeData })
  );

export const deleteNoticeRequest = noticeData => async dispatch =>
  dispatch(
    makeRequest({ requestFunction: deleteNotice, requestData: noticeData })
  );
