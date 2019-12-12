import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import AuthButton from "../AuthButton";
import AuthTextField from "../AuthTextField";
import AuthSelectMenu from "../AuthSelectMenu";
import AuthForm from "../AuthForm";
import RepeatedTextField from "../RepeatedTextField";
import { usualUserTypes } from "../../../shared/constants";

function Register({ registerRequest, isFetching }) {
  const userTypes = Object.values(usualUserTypes);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    userType: userTypes[0]
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const setDataField = (fieldName, value) =>
    setFormData({
      ...formData,
      [fieldName]: value
    });

  const handleFieldChange = event =>
    setDataField(event.target.name, event.target.value);

  const handleRegisterClick = () => {
    registerRequest(formData);
  };

  const handleEmailValidation = ({ value, isValid }) => {
    setDataField("email", value);
    setIsEmailValid(isValid);
  };

  const handlePasswordValidation = ({ value, isValid }) => {
    setDataField("password", value);
    setIsPasswordValid(isValid);
  };

  const isUserDataValid = () =>
    formData.userType === usualUserTypes.USER
      ? formData.firstName && formData.lastName
      : formData.companyName;

  return (
    <AuthForm>
      {formData.userType === usualUserTypes.USER ? (
        <Fragment>
          <AuthTextField
            name="firstName"
            label="first name"
            onChange={handleFieldChange}
          />
          <AuthTextField
            name="lastName"
            label="last name"
            onChange={handleFieldChange}
          />
        </Fragment>
      ) : (
        <AuthTextField
          name="companyName"
          label="company name"
          onChange={handleFieldChange}
        />
      )}
      <RepeatedTextField label="e-mail" onValidation={handleEmailValidation} />
      <RepeatedTextField
        label="password"
        type="password"
        onValidation={handlePasswordValidation}
      />
      <AuthSelectMenu
        name="userType"
        onChange={handleFieldChange}
        userType={formData.userType}
        userTypes={userTypes}
      />
      <AuthButton
        disabled={
          !isEmailValid || !isPasswordValid || !isUserDataValid() || isFetching
        }
        onClick={handleRegisterClick}
      >
        Register
      </AuthButton>
    </AuthForm>
  );
}

Register.propTypes = {
  registerRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Register;
