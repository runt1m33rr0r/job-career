import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./AuthButton";
import TextField from "./AuthTextField";
import Form from "./AuthForm";

function Profile({ profileChangeRequest }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    eMail: "",
    password: ""
  });

  const handleFieldChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const handleSave = () => profileChangeRequest(formData);

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
      <TextField name="eMail" label="e-mail" onChange={handleFieldChange} />
      <TextField label="repeat e-mail" />
      <TextField
        name="password"
        label="password"
        type="password"
        onChange={handleFieldChange}
      />
      <TextField label="repeat password" type="password" />
      <Button onClick={handleSave}>Save</Button>
    </Form>
  );
}

Profile.propTypes = {
  profileChangeRequest: PropTypes.func.isRequired
};

export default Profile;
