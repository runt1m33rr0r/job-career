import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../AuthButton";
import TextField from "../AuthTextField";
import Form from "../AuthForm";
import RepeatedTextField from "../RepeatedTextField";

function Profile({ profileChangeRequest, isFetching }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    password: ""
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

  const handleEmailValidation = ({ value, isValid }) => {
    setDataField("email", value);
    setIsEmailValid(isValid);
  };

  const handlePasswordValidation = ({ value, isValid }) => {
    setDataField("password", value);
    setIsPasswordValid(isValid);
  };

  const handleSave = () => profileChangeRequest(formData);

  const isFormValid = () =>
    formData.firstName &&
    formData.lastName &&
    formData.companyName &&
    formData.phoneNumber;

  return (
    <Form>
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
      <TextField
        name="companyName"
        label="company name"
        onChange={handleFieldChange}
      />
      <TextField
        name="phoneNumber"
        label="phone number"
        onChange={handleFieldChange}
      />
      <RepeatedTextField label="e-mail" onValidation={handleEmailValidation} />
      <RepeatedTextField
        label="password"
        type="password"
        onValidation={handlePasswordValidation}
      />
      <TextField
        name="password"
        label="password"
        type="password"
        onChange={handleFieldChange}
      />
      <TextField label="repeat password" type="password" />
      <Button
        disabled={
          !isPasswordValid || !isEmailValid || !isFormValid || isFetching
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
  isFetching: PropTypes.bool.isRequired
};

export default Profile;
