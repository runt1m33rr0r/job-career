import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import TextField from "./AuthTextField";

function RepeatedTextField({ label, type, onValidation, value }) {
  const [valueData, setValueData] = useState({
    value: value ? value : "",
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

    // const isValid =
    //   event.target.value && event.target.value === valueData.repeatValue;
    // onValidation({ value: event.target.value, isValid });
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
        value={valueData.value}
      />
      <TextField
        name="repeatValue"
        label={`repeat ${label}`}
        type={type}
        onChange={handleRepeatChange}
        value={valueData.repeatValue}
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
