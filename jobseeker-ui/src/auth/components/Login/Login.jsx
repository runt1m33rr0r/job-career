import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../AuthButton";
import TextField from "../AuthTextField";
import SelectMenu from "../AuthSelectMenu";
import Form from "../AuthForm";

const userTypes = ["user", "company", "admin"];

function Login({ loginRequest, isFetching }) {
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

  const handleLoginClick = () => {
    loginRequest(formData);
  };

  return (
    <Form>
      <TextField name="eMail" label="e-mail" onChange={handleFieldChange} />
      <TextField
        name="password"
        label="password"
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
        disabled={!formData.eMail || !formData.password || isFetching}
        onClick={handleLoginClick}
      >
        Log in
      </Button>
    </Form>
  );
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired
};

export default Login;
