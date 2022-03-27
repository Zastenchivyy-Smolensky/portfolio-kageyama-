import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";
import { AuthContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../../lib/api/auth";
import Cookies from "js-cookie";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const useStyles = makeStyles((theme) => ({
  IconButton: {
    marginTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    flexDecoration: "none",
    color: "inherit",
  },
  linkBtn: {
    textTransform: "none",
  },
}));

function Header() {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const handleSignOut = async (e) => {
    try {
      const res = await signOut();
      if (res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        setIsSignedIn(false);
        history.push("/signin");
        console.log("succeeed in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <IconButton
              component={Link}
              to="/users"
              edge="start"
              className={classes.linkBtn}
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              component={Link}
              to="/"
              edge="start"
              className={classes.linkBtn}
              color="inherit"
            >
              <PersonIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleSignOut}
              className={classes.linkBtn}
            >
              <ExitToAppIcon />
            </IconButton>
          </>
        );
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/signin"
              color="inherit"
              className={classes.linkBtn}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              className={classes.linkBtn}
            >
              Sign up
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/list"
            variant="h6"
            className={classes.title}
          >
            Portfolio
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
