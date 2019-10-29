import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 200
  },
  button: {
    width: 150
  }
}));

const userTypes = ["Person", "Company", "Admin"];

function Login() {
  const [userType, setUserType] = React.useState("Person");
  const classes = useStyles();

  const handleUserTypeChange = event => {
    setUserType(event.target.value);
  };

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField fullWidth required label="e-mail" margin="normal" />
      <TextField
        fullWidth
        required
        label="password"
        type="password"
        margin="normal"
      />
      <TextField
        fullWidth
        select
        label="Select user type"
        value={userType}
        onChange={handleUserTypeChange}
        margin="normal"
      >
        {userTypes.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" className={classes.button}>
        Log in
      </Button>
    </form>
  );
}

export default Login;
