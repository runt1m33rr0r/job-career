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

      if (applicationIdx > 0) {
        state.applications[applicationIdx].id = id;
        state.applications[applicationIdx].phone = phone;
        state.applications[applicationIdx].email = email;
        state.applications[applicationIdx].letter = letter;
      }
    },
    deleteApplicationSuccess: (state, action) => {
      const applicationIdx = state.applications.findIndex(action.payload.id);
      if (applicationIdx > 0) {
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

export const getApplicationsRequest = requestData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: getApplications,
      requestData,
      successAction: getApplicationsSuccess,
      shouldAlert: false
    })
  );

export const editApplicationRequest = applicationData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: editApplication,
      requestData: applicationData,
      successAction: editApplicationSuccess
    })
  );

export const createApplicationRequest = applicationData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: createApplication,
      requestData: applicationData
    })
  );

export const deleteApplicationRequest = applicationData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: deleteApplication,
      requestData: applicationData,
      successAction: deleteApplicationSuccess
    })
  );
