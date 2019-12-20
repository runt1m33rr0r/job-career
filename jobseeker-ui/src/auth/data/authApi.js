import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";
import { setItem, removeAll } from "../../shared/storageUtils";
import { usualUserTypes } from "../../shared/constants";

const USERS_ROUTE = `${BASE_ROUTE}users\\`;

export async function register({
  userType,
  firstName,
  lastName,
  companyName,
  email,
  password
}) {
  console.log({
    userType,
    firstName,
    lastName,
    companyName,
    email,
    password
  });

  try {
    let requestData = { companyName, email, password };

    if (userType === usualUserTypes.USER) {
      requestData = {
        firstName,
        lastName,
        email,
        password
      };
    }

    const response = await axios.post(`${USERS_ROUTE}register`, requestData);

    console.log(response.data);

    if (response.data.success) {
      return await login({ email, password });
    }

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function login({ email, password }) {
  console.log({ email, password });

  try {
    const response = await axios.post(`${USERS_ROUTE}login`, {
      email,
      password
    });

    if (response.data.success) {
      const userData = {
        success: response.data.success,
        message: response.data.message,
        id: response.data.user.id,
        email: response.data.user.email,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        companyName: response.data.user.name,
        phoneNumber: response.data.user.number,
        userType: response.data.user.type.toLowerCase(),
        token: response.data.user.token
      };

      setItem("userId", userData.id);
      setItem("email", userData.email);
      setItem("firstName", userData.firstName);
      setItem("lastName", userData.lastName);
      setItem("companyName", userData.companyName);
      setItem("phoneNumber", userData.phoneNumber);
      setItem("userType", userData.userType);
      setItem("token", userData.token);

      return userData;
    }

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function logOut({ email, token }) {
  console.log({ email, token });

  try {
    const response = await axios.post(`${USERS_ROUTE}logout`, { email, token });

    if (response.data.success) {
      removeAll();
    }

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function changeProfile({
  id,
  firstName,
  lastName,
  companyName,
  phoneNumber,
  email,
  password,
  token
}) {
  console.log({
    id,
    firstName,
    lastName,
    companyName,
    phoneNumber,
    email,
    password,
    token
  });

  try {
    const response = await axios.patch(`${USERS_ROUTE}${id}`, {
      firstName,
      lastName,
      companyName,
      number: phoneNumber,
      email,
      password,
      token
    });

    console.log(response.data);

    setItem("email", email);
    setItem("firstName", firstName);
    setItem("lastName", lastName);
    setItem("companyName", companyName);
    setItem("phoneNumber", phoneNumber);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}
