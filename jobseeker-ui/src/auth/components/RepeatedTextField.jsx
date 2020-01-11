import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import TextField from "./AuthTextField";

function RepeatedTextField({ label, type, onValidation, value }) {
  const [inputValue, setInputValue] = useState(value ? value : "");
  const [repeatValue, setRepeatValue] = useState("");

  const handleChange = event => {
    setInputValue(event.target.value);

    const isValid = event.target.value && event.target.value === repeatValue;
    onValidation({ value: event.target.value, isValid });
  };

  const handleRepeatChange = event => {
    setRepeatValue(event.target.value);

    const isValid = event.target.value && event.target.value === inputValue;
    onValidation({ value: event.target.value, isValid });
  };

  return (
    <Fragment>
      <TextField
        name="value"
        label={label}
        type={type}
        onChange={handleChange}
        value={inputValue}
      />
      <TextField
        name="repeatValue"
        label={`repeat ${label}`}
        type={type}
        onChange={handleRepeatChange}
        value={repeatValue}
      />
    </Fragment>
  );
}

RepeatedTextField.propTypes = {
  label: PropTypes.string.isRequired,
  onValidation: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

export default RepeatedTextField;
