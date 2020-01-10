export const isEmailValid = email => {
  if (!email) {
    return false;
  }

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = re.test(String(email).toLowerCase());

  return isValidEmail;
};

export const isPasswordValid = password => password && password.length >= 6;

export const isNameValid = name => name && name.length >= 2;

export const checkPhoneNumber = phoneNumber =>
  !phoneNumber || phoneNumber.length === 10;
