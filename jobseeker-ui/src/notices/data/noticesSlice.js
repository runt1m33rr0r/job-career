import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import { createNotice } from "./noticesApi";

const noticesSlice = createSlice({
  name: "notices",
  initialState: {
    notices: [
      {
        id: 1,
        title: "some title",
        category: "category1",
        company: "company",
        content: "content",
        closed: false,
        approved: false,
        lastModified: "some date"
      }
    ]
  },
  reducers: {
    getAllNoticesSuccess: (state, action) => {
      state.notices = action.payload.notices;
    }
  }
});

export const { getAllNoticesSuccess } = noticesSlice.actions;

export default noticesSlice.reducer;

export const createNoticeRequest = noticeData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: createNotice,
      requestData: { ...noticeData, companyName: getState().auth.companyName }
    })
  );
