import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "../AuthButton";
import TextField from "../AuthTextField";
import Form from "../AuthForm";
import RepeatedTextField from "../RepeatedTextField";
import { userTypes } from "../../../shared/constants";
import {
  isEmailValid as checkEmail,
  isPasswordValid as checkPassword,
  isNameValid as checkName,
  checkPhoneNumber
} from "../../../shared/helpers";

function Profile({
  profileChangeRequest,
  isFetching,
  userType,
  firstName,
  lastName,
  companyName,
  phoneNumber,
  email
}) {
  const [formData, setFormData] = useState({
    firstName: firstName ? firstName : "",
    lastName: lastName ? lastName : "",
    companyName: companyName ? companyName : "",
    phoneNumber: phoneNumber ? phoneNumber : "",
    email: email ? email : "",
    password: ""
  });

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const setDataField = (fieldName, value) =>
    setFormData({
      ...formData,
      [fieldName]: value
    });

  const handleFieldChange = event =>
    setDataField(event.target.name, event.target.value);

  const handleEmailValidation = ({ value, isValid }) => {
    setDataField("email", value);
    setIsEmailValid(isValid && checkEmail(value));
  };

  const handlePasswordValidation = ({ value, isValid }) => {
    setDataField("password", value);
    setIsPasswordValid(isValid && checkPassword(value));
  };

  const handleSave = () => profileChangeRequest(formData);

  const isFormValid = () => {
    if (userType === userTypes.USER) {
      return (
        checkName(formData.firstName) &&
        checkName(formData.lastName) &&
        checkPhoneNumber(formData.phoneNumber) &&
        isEmailValid
      );
    } else if (userType === userTypes.COMPANY) {
      return checkName(formData.companyName) && isEmailValid;
    }

    return isEmailValid;
  };

  return (
    <Form>
      {userType === userTypes.USER && (
        <Fragment>
          <TextField
            name="firstName"
            label="first name"
            onChange={handleFieldChange}
            value={formData.firstName}
          />
          <TextField
            name="lastName"
            label="last name"
            onChange={handleFieldChange}
            value={formData.lastName}
          />
        </Fragment>
      )}
      {userType === userTypes.COMPANY && (
        <TextField
          name="companyName"
          label="company name"
          onChange={handleFieldChange}
          value={formData.companyName}
        />
      )}
      {userType !== userTypes.ADMIN && (
        <TextField
          name="phoneNumber"
          label="phone number"
          onChange={handleFieldChange}
          value={formData.phoneNumber}
        />
      )}
      <RepeatedTextField
        label="e-mail"
        onValidation={handleEmailValidation}
        value={formData.email}
      />
      <RepeatedTextField
        label="password"
        type="password"
        onValidation={handlePasswordValidation}
      />
      <Button
        disabled={
          !isPasswordValid || !isEmailValid || !isFormValid() || isFetching
        }
        onClick={handleSave}
      >
        Save
      </Button>
    </Form>
  );
}

Profile.propTypes = {
  profileChangeRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  companyName: PropTypes.string,
  phoneNumber: PropTypes.string
};

export default Profile;
