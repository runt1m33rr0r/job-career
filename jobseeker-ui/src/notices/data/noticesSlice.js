import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import {
  createNotice,
  editNotice,
  getCompanyNotices,
  getNotices,
  deleteNotice
} from "./noticesApi";

const noticesSlice = createSlice({
  name: "notices",
  initialState: {
    notices: []
  },
  reducers: {
    getNoticesSuccess: (state, action) => {
      state.notices = action.payload.notices;
    }
  }
});

export const { getNoticesSuccess } = noticesSlice.actions;

export default noticesSlice.reducer;

export const getCompanyNoticesRequest = () => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: getCompanyNotices,
      requestData: { company: getState().auth.companyName },
      successAction: getNoticesSuccess,
      shouldAlert: false
    })
  );

export const getNoticesRequest = noticesData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: getNotices,
      requestData: noticesData,
      successAction: getNoticesSuccess,
      shouldAlert: false
    })
  );

export const createNoticeRequest = noticeData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: createNotice,
      requestData: { ...noticeData, companyName: getState().auth.companyName },
      successAction: getNoticesSuccess,
      shouldAlert: true
    })
  );

export const editNoticeRequest = noticeData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: editNotice,
      requestData: { ...noticeData, company: getState().auth.companyName },
      successAction: getNoticesSuccess,
      shouldAlert: false
    })
  );

export const deleteNoticeRequest = noticeData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: deleteNotice,
      requestData: { ...noticeData, company: getState().auth.companyName },
      successAction: getNoticesSuccess,
      shouldAlert: false
    })
  );
