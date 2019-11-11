import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Button from "./AuthButton";
import TextField from "./AuthTextField";
import SelectMenu from "./AuthSelectMenu";
import Form from "./AuthForm";

const userTypes = ["user", "company"];

function Register({ registerRequest }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    eMail: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
    userType: userTypes[0]
  });

  const handleFieldChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const handleRegisterClick = () => {
    registerRequest({
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      eMail: formData.eMail,
      password: formData.password,
      userType: formData.userType
    });
  };

  const isEmailValid = () =>
    formData.eMail && formData.eMail === formData.repeatEmail;

  const isPasswordValid = () =>
    formData.password && formData.password === formData.repeatPassword;

  const isUserDataValid = () =>
    formData.userType === "user"
      ? formData.firstName && formData.lastName
      : formData.companyName;

  return (
    <Form>
      {formData.userType === "user" ? (
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
      <TextField name="eMail" label="e-mail" onChange={handleFieldChange} />
      <TextField
        name="repeatEmail"
        label="repeat e-mail"
        onChange={handleFieldChange}
      />
      <TextField
        name="password"
        label="password"
        type="password"
        onChange={handleFieldChange}
      />
      <TextField
        name="repeatPassword"
        label="repeat password"
        type="password"
        onChange={handleFieldChange}
      />
      <SelectMenu
        name="userType"
        onChange={handleFieldChange}
        userType={formData.userType}
        userTypes={userTypes}
      />
      <Button
        disabled={!isEmailValid() || !isPasswordValid() || !isUserDataValid()}
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
