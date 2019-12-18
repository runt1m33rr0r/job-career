import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import {
  createApplication,
  deleteApplication,
  editApplication,
  getApplications
} from "./applicationsApi";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applications: []
  },
  reducers: {
    getApplicationsSuccess: (state, action) => {
      state.applications = action.payload.applications;
    },
    editApplicationSuccess: (
      state,
      { payload: { id, phone, email, letter } }
    ) => {
      const applicationIdx = state.applications.findIndex(el => el.id === id);
      if (applicationIdx >= 0) {
        state.applications[applicationIdx].id = id;
        state.applications[applicationIdx].phone = phone;
        state.applications[applicationIdx].email = email;
        state.applications[applicationIdx].letter = letter;
      }
    },
    deleteApplicationSuccess: (state, action) => {
      const applicationIdx = state.applications.findIndex(
        el => el.id === action.payload.id
      );

      if (applicationIdx >= 0) {
        state.applications.splice(applicationIdx, 1);
      }
    }
  }
});

export const {
  getApplicationsSuccess,
  editApplicationSuccess,
  createApplicationSuccess,
  deleteApplicationSuccess
} = applicationsSlice.actions;

export default applicationsSlice.reducer;

export const getApplicationsRequest = requestData => async (
  dispatch,
  getState
) =>
  dispatch(
    makeRequest({
      requestFunction: getApplications,
      requestData: { ...requestData, token: getState().auth.token },
      successAction: getApplicationsSuccess,
      shouldAlert: false
    })
  );

export const editApplicationRequest = applicationData => async (
  dispatch,
  getState
) =>
  dispatch(
    makeRequest({
      requestFunction: editApplication,
      requestData: { ...applicationData, token: getState().auth.token },
      successAction: editApplicationSuccess
    })
  );

export const createApplicationRequest = applicationData => async (
  dispatch,
  getState
) =>
  dispatch(
    makeRequest({
      requestFunction: createApplication,
      requestData: { ...applicationData, token: getState().auth.token }
    })
  );

export const deleteApplicationRequest = applicationData => async (
  dispatch,
  getState
) =>
  dispatch(
    makeRequest({
      requestFunction: deleteApplication,
      requestData: { ...applicationData, token: getState().auth.token },
      successAction: deleteApplicationSuccess
    })
  );
