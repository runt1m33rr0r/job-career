import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import { register, login, changeProfile } from "./authApi";

const initialState = {
  type: "",
  firstName: "",
  lastName: "",
  companyName: "",
  eMail: "",
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.type = action.payload.type;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.companyName = action.payload.companyName;
      state.eMail = action.payload.eMail;
    },
    loginFailure: state => {
      state.isAuthenticated = false;
    },
    logout: () => initialState,
    registerSuccess: state => {
      state.isAuthenticated = false;
    },
    registerFailure: state => {
      state.isAuthenticated = false;
    },
    profileChangeSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.companyName = action.payload.companyName;
      state.eMail = action.payload.eMail;
      state.phoneNumber = action.payload.phoneNumber;
    },
    profileChangeFailure: state => {
      state.isAuthenticated = true;
    }
  }
});

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  profileChangeSuccess,
  profileChangeFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;

export const registerRequest = registrationData => async dispatch =>
  dispatch(
    makeRequest(register, registrationData, registerSuccess, registerFailure)
  );

export const loginRequest = loginData => async dispatch =>
  dispatch(makeRequest(login, loginData, loginSuccess, loginFailure));

export const profileChangeRequest = profileData => async dispatch =>
  dispatch(
    makeRequest(
      changeProfile,
      profileData,
      profileChangeSuccess,
      profileChangeFailure
    )
  );
