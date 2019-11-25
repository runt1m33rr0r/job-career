import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Routes from "../Routes";
import DrawerItem from "../DrawerItem";
import Notification from "../Notification";
import { userTypes } from "../../../shared/constants";

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: blue,
    type: "dark"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  main: {
    flexGrow: 1
  },
  content: {
    minHeight: `calc(100% - ${64}px)`
  },
  link: {
    textDecoration: "none"
  },
  title: {
    flexGrow: 1
  }
}));

function App({
  userType,
  firstName,
  lastName,
  companyName,
  email,
  isAuthenticated,
  requestLogout
}) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutPress = () => {
    requestLogout();
    handleClose();
  };

  const getUserName = () => {
    if (!isAuthenticated) {
      return;
    }

    if (userType === userTypes.USER) {
      return `${firstName} ${lastName}`;
    } else if (userType === userTypes.COMPANY) {
      return companyName;
    } else {
      return email;
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <DrawerItem text="Home" linkTo="/" />
        {(userType === userTypes.COMPANY || userType === userTypes.ADMIN) && (
          <DrawerItem text="Notices" linkTo="/notices" />
        )}
        {(userType === userTypes.COMPANY || userType === userTypes.USER) && (
          <DrawerItem text="Applications" linkTo="/applications" />
        )}
        <DrawerItem text="Search" linkTo="/search" />
        {userType === userTypes.ADMIN && (
          <DrawerItem text="Categories" linkTo="/categories" />
        )}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Jobs Finder
            </Typography>
            <Typography variant="h6">{getUserName()}</Typography>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              {!isAuthenticated && [
                <MenuItem
                  key={1}
                  component={Link}
                  to="/login"
                  onClick={handleClose}
                >
                  Login
                </MenuItem>,
                <MenuItem
                  key={2}
                  component={Link}
                  to="/register"
                  onClick={handleClose}
                >
                  Register
                </MenuItem>
              ]}
              {isAuthenticated && [
                <MenuItem
                  key={3}
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>,
                <MenuItem key={4} onClick={handleLogoutPress}>
                  Logout
                </MenuItem>
              ]}
            </Menu>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.main}>
          <Notification />
          <div className={classes.toolbar} />
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.content}
          >
            <Grid item container justify="center" alignItems="center">
              <Routes />
            </Grid>
          </Grid>
        </main>
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  requestLogout: PropTypes.func.isRequired
};

export default App;
