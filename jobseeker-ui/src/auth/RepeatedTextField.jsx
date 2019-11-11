import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import TextField from "./AuthTextField";

function RepeatedTextField({ label, type, onValidation }) {
  const [valueData, setValueData] = useState({
    value: "",
    repeatValue: ""
  });

  const handleFieldChange = (fieldName, value) => {
    setValueData({
      ...valueData,
      [fieldName]: value
    });
  };

  const handleChange = event => {
    handleFieldChange(event.target.name, event.target.value);

    const isValid =
      event.target.value && event.target.value === valueData.repeatValue;
    onValidation({ value: event.target.value, isValid });
  };

  const handleRepeatChange = event => {
    handleFieldChange(event.target.name, event.target.value);

    const isValid =
      event.target.value && event.target.value === valueData.value;
    onValidation({ value: event.target.value, isValid });
  };

  return (
    <Fragment>
      <TextField
        name="value"
        label={label}
        type={type}
        onChange={handleChange}
      />
      <TextField
        name="repeatValue"
        label={`repeat ${label}`}
        type={type}
        onChange={handleRepeatChange}
      />
    </Fragment>
  );
}

RepeatedTextField.propTypes = {
  label: PropTypes.string.isRequired,
  onValidation: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default RepeatedTextField;
