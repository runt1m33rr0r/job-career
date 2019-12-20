import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import { register, login, changeProfile, logOut } from "./authApi";
import { getString, getItem } from "../../shared/storageUtils";

const getInitialState = () => ({
  userId: getString("userId"),
  userType: getString("userType"),
  firstName: getString("firstName"),
  lastName: getString("lastName"),
  companyName: getString("companyName"),
  email: getString("email"),
  phoneNumber: getString("phoneNumber"),
  isAuthenticated: !!getItem("token"),
  token: getItem("token")
});

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.id;
      state.userType = action.payload.userType;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.companyName = action.payload.companyName;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    loginFailure: state => {
      state.isAuthenticated = false;
    },
    logoutSuccess: () => getInitialState(),
    logoutFailure: state => {
      state.isAuthenticated = true;
    },
    registerFailure: state => {
      state.isAuthenticated = false;
    },
    profileChangeSuccess: (
      state,
      { payload: { firstName, lastName, companyName, email, phoneNumber } }
    ) => {
      state.isAuthenticated = true;
      state.firstName = firstName ? firstName : state.firstName;
      state.lastName = lastName ? lastName : state.lastName;
      state.companyName = companyName ? companyName : state.companyName;
      state.email = email ? email : state.email;
      state.phoneNumber = phoneNumber ? phoneNumber : state.phoneNumber;
    }
  }
});

export const {
  loginSuccess,
  loginFailure,
  registerFailure,
  profileChangeSuccess,
  profileChangeFailure,
  logoutSuccess,
  logoutFailure
} = authSlice.actions;

export default authSlice.reducer;

export const registerRequest = registrationData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: register,
      successAction: loginSuccess,
      failAction: registerFailure,
      requestData: registrationData
    })
  );

export const loginRequest = loginData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: login,
      successAction: loginSuccess,
      failAction: loginFailure,
      requestData: loginData
    })
  );

export const profileChangeRequest = profileData => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: changeProfile,
      successAction: profileChangeSuccess,
      requestData: {
        ...profileData,
        id: getState().auth.userId,
        token: getState().auth.token
      }
    })
  );

export const logoutRequest = () => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: logOut,
      successAction: logoutSuccess,
      failAction: logoutFailure,
      requestData: {
        email: getState().auth.email,
        token: getState().auth.token
      }
    })
  );
