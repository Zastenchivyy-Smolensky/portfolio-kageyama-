import React, { useContext, useState } from "react";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";
import AlertMessage from "../utils/AlertMessage";
import { signUp } from "../../lib/api/auth";
import { AuthContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
  },
  header: {
    textAlign: "center",
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 340,
  },
}));
function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const confirmSucceessUrl = "http://localhost:3000";

  const createFormData = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirmation", passwordConfirmation);

    return formData;
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const data = createFormData();
    try {
      const res = await signUp(data);
      console.log(res);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        history.push("/list");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        console.log("Signed in successful");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (e) {
      console.log(e);
      setAlertMessageOpen(true);
    }
  };
  return (
    <div>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Sign up" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="??????"
              value={name}
              margin="dense"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              label="password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!email || !password || !passwordConfirmation}
              className={classes.submitBtn}
              value={confirmSucceessUrl}
              onClick={(e) => handleSignUpSubmit(e)}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid email or password"
      />
    </div>
  );
}

export default SignUp;
