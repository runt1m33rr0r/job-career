import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Button from "./AuthButton";
import TextField from "./AuthTextField";
import SelectMenu from "./AuthSelectMenu";
import Form from "./AuthForm";

const userTypes = ["user", "company"];

function Register({ registerRequest }) {
  const [formData, setFormData] = useState({
    eMail: "",
    password: "",
    userType: userTypes[0]
  });

  const handleFieldChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const handleRegisterClick = () => registerRequest(formData);

  return (
    <Form>
      {formData.userType === "person" ? (
        <Fragment>
          <TextField label="first name" />
          <TextField label="last name" />
        </Fragment>
      ) : (
        <TextField label="company name" />
      )}
      <TextField label="e-mail" />
      <TextField label="repeat e-mail" />
      <TextField label="password" type="password" />
      <TextField label="repeat password" type="password" />
      <SelectMenu
        name="userType"
        onChange={handleFieldChange}
        userType={formData.userType}
        userTypes={userTypes}
      />
      <Button onClick={handleRegisterClick}>Register</Button>
    </Form>
  );
}

Register.propTypes = {
  registerRequest: PropTypes.func.isRequired
};

export default Register;
