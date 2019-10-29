import React from "react";
import Button from "./AuthButton";
import TextField from "./AuthTextField";
import SelectMenu from "./AuthSelectMenu";
import Form from "./AuthForm";

const userTypes = ["Person", "Company", "Admin"];

function Login() {
  return (
    <Form>
      <TextField label="e-mail" />
      <TextField label="password" type="password" />
      <SelectMenu userTypes={userTypes} />
      <Button>Log in</Button>
    </Form>
  );
}

export default Login;
