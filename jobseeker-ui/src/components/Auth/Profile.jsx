import React from "react";
import Button from "./AuthButton";
import TextField from "./AuthTextField";
import Form from "./AuthForm";

const Profile = () => (
  <Form>
    <TextField label="first name" />
    <TextField label="last name" />
    <TextField label="company name" />
    <TextField label="phone number" />
    <TextField label="e-mail" />
    <TextField label="repeat e-mail" />
    <TextField label="password" type="password" />
    <TextField label="repeat password" type="password" />
    <Button>Save</Button>
  </Form>
);

export default Profile;
