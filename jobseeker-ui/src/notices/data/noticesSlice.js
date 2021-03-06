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
      const processedNotices = action.payload.notices.map(notice => ({
        ...notice,
        lastModified: new Date(notice.lastModified).toLocaleDateString()
      }));

      state.notices = processedNotices;
    },
    editNoticeSuccess: (
      state,
      { payload: { id, category, title, content, status } }
    ) => {
      const noticeIdx = state.notices.findIndex(el => el.id === id);
      if (noticeIdx >= 0) {
        if (category) {
          state.notices[noticeIdx].category.name = category;
        }

        if (title) {
          state.notices[noticeIdx].title = title;
        }

        if (content) {
          state.notices[noticeIdx].content = content;
        }

        if (status) {
          state.notices[noticeIdx].status = status;
        }

        state.notices[noticeIdx].lastModified = new Date().toLocaleDateString();
      }
    }
  }
});

export const { getNoticesSuccess, editNoticeSuccess } = noticesSlice.actions;

export default noticesSlice.reducer;

export const getCompanyNoticesRequest = () => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: getCompanyNotices,
      requestData: {
        company: getState().auth.companyName,
        token: getState().auth.token
      },
      successAction: getNoticesSuccess,
      shouldAlert: false
    })
  );

export const getNoticesRequest = noticesData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: getNotices,
      requestData: { ...noticesData, token: getState().auth.token },
      successAction: getNoticesSuccess,
      shouldAlert: false
    })
  );

export const createNoticeRequest = noticeData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: createNotice,
      requestData: {
        ...noticeData,
        companyName: getState().auth.companyName,
        token: getState().auth.token
      },
      successAction: getNoticesSuccess
    })
  );

export const editNoticeRequest = noticeData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: editNotice,
      requestData: {
        ...noticeData,
        token: getState().auth.token
      },
      successAction: editNoticeSuccess,
      shouldAlert: false
    })
  );

export const deleteNoticeRequest = noticeData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: deleteNotice,
      requestData: {
        ...noticeData,
        company: getState().auth.companyName,
        token: getState().auth.token
      },
      successAction: getNoticesSuccess
    })
  );
