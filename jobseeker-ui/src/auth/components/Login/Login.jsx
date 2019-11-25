import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../AuthButton";
import TextField from "../AuthTextField";
import Form from "../AuthForm";

function Login({ loginRequest, isFetching }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      <TextField name="email" label="e-mail" onChange={handleFieldChange} />
      <TextField
        name="password"
        label="password"
        type="password"
        onChange={handleFieldChange}
      />
      <Button
        disabled={!formData.email || !formData.password || isFetching}
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
