import { createSlice } from "redux-starter-kit";

const initialState = {
  userType: "",
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
    loginRequest: state => {
      state.isAuthenticated = true;
    },
    loginSuccess: state => {
      state.isAuthenticated = true;
    },
    loginFailure: state => {
      state.isAuthenticated = false;
    },
    logout: () => initialState,
    registerRequest: state => {
      state.isAuthenticated = true;
    },
    registerSuccess: state => {
      state.isAuthenticated = true;
    },
    registerFailure: state => {
      state.isAuthenticated = false;
    },
    profileChangeRequest: state => {
      state.isAuthenticated = true;
    },
    profileChangeSuccess: state => {
      state.isAuthenticated = true;
    },
    profileChangeFailure: state => {
      state.isAuthenticated = true;
    }
  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  profileChangeRequest,
  profileChangeSuccess,
  profileChangeFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;
