import React, { useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
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
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Routes from "../Routes";
import DrawerItem from "../DrawerItem";
import Notification from "../Notification";
import NoticeModal from "../../../notices/components/NoticeModal";
import { userTypes } from "../../../shared/constants";

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
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
  requestLogout,
  history,
  getAllCategoriesRequest
}) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateNoticeOpen, setIsCreateNoticeOpen] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getAllCategoriesRequest();
  }, [getAllCategoriesRequest]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleCreateNoticeToggle = () =>
    setIsCreateNoticeOpen(!isCreateNoticeOpen);

  const handleLogoutPress = () => {
    history.push("/");
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
        {userType === userTypes.COMPANY && (
          <ListItem button onClick={handleCreateNoticeToggle}>
            <ListItemText primary="Create notice" />
          </ListItem>
        )}
        {(userType === userTypes.COMPANY || userType === userTypes.ADMIN) && (
          <DrawerItem text="My notices" linkTo="/notices/mine" />
        )}
        {(userType === userTypes.COMPANY || userType === userTypes.USER) && (
          <DrawerItem text="My applications" linkTo="/applications" />
        )}
        <DrawerItem text="Search notices" linkTo="/search" />
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
            <div className={classes.title}>
              <img src="logo.png" height="60" alt="logo" />
            </div>
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
                </MenuItem>,
                <MenuItem
                  key={3}
                  component={Link}
                  to="/forgotten"
                  onClick={handleClose}
                >
                  Forgotten password
                </MenuItem>
              ]}
              {isAuthenticated && userType !== userTypes.ADMIN && (
                <MenuItem
                  key={3}
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
              )}
              {isAuthenticated && (
                <MenuItem key={4} onClick={handleLogoutPress}>
                  Logout
                </MenuItem>
              )}
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
          <NoticeModal
            onClose={handleCreateNoticeToggle}
            isOpen={isCreateNoticeOpen}
            creationNotice={true}
          />
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

export default withRouter(App);
