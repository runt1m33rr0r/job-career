import React, { Fragment } from "react";
import Button from "./AuthButton";
import TextField from "./AuthTextField";
import SelectMenu from "./AuthSelectMenu";
import Form from "./AuthForm";

const userTypes = ["Person", "Company"];

function Register() {
  const [userType, setUserType] = React.useState("Person");

  const handleUserTypeChange = newType => {
    setUserType(newType);
  };

  return (
    <Form>
      {userType === "Person" ? (
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
        userTypes={userTypes}
        onUserTypeChange={handleUserTypeChange}
      />
      <Button>Register</Button>
    </Form>
  );
}

export default Register;
