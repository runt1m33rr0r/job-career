import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../AuthButton";
import TextField from "../AuthTextField";
import Form from "../AuthForm";
import { isEmailValid } from "../../../shared/helpers";

function ForgottenPassword({ forgottenPasswordRequest, isFetching }) {
  const [email, setEmail] = useState("");

  const handleSendClick = () => {
    forgottenPasswordRequest({ email });
  };

  const handleEmailChange = event => setEmail(event.target.value);

  return (
    <Form>
      <TextField name="email" label="e-mail" onChange={handleEmailChange} />
      <Button
        disabled={!isEmailValid(email) || isFetching}
        onClick={handleSendClick}
      >
        Send
      </Button>
    </Form>
  );
}

ForgottenPassword.propTypes = {
  forgottenPasswordRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default ForgottenPassword;
