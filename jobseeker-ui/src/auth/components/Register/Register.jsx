import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Button from "../AuthButton";
import TextField from "../AuthTextField";
import SelectMenu from "../AuthSelectMenu";
import Form from "../AuthForm";
import RepeatedTextField from "../RepeatedTextField";
import { usualUserTypes } from "../../../shared/constants";

const userTypes = Object.values(usualUserTypes);

function Register({ registerRequest, isFetching }) {
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
    <Form>
      {formData.userType === usualUserTypes.USER ? (
        <Fragment>
          <TextField
            name="firstName"
            label="first name"
            onChange={handleFieldChange}
          />
          <TextField
            name="lastName"
            label="last name"
            onChange={handleFieldChange}
          />
        </Fragment>
      ) : (
        <TextField
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
      <SelectMenu
        name="userType"
        onChange={handleFieldChange}
        userType={formData.userType}
        userTypes={userTypes}
      />
      <Button
        disabled={
          !isEmailValid || !isPasswordValid || !isUserDataValid() || isFetching
        }
        onClick={handleRegisterClick}
      >
        Register
      </Button>
    </Form>
  );
}

Register.propTypes = {
  registerRequest: PropTypes.func.isRequired
};

export default Register;
