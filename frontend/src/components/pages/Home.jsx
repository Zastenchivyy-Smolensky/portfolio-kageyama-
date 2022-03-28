import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Input,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Cookies from "js-cookie";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import { signOut } from "../../lib/api/auth";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CancelIcon from "@material-ui/icons/Cancel";
import { getUser, updateUser } from "../../lib/api/users";

const useStyle = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  card: {
    width: 340,
  },
  imageUploadBtn: {
    textAlign: "right",
  },
  input: {
    display: "none",
  },
  box: {
    marginBottom: "1.5rem",
  },
  preview: {
    width: "100%",
  },
}));
function Home() {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } =
    useContext(AuthContext);
  const classes = useStyle();
  const history = useHistory();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [name, setName] = useState(currentUser?.name);
  const [profile, setProfile] = useState(currentUser?.profile);
  // const [prefecture, setPrefecture] = useState(currentUser?.prefecture);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const createFormData = () => {
    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("profile", profile || "");
    formData.append("image", image);
    return formData;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = createFormData();
    try {
      const res = await updateUser(currentUser?.id, data);
      if (res.status === 200) {
        setEditFormOpen(false);
        setCurrentUser(res.data.user);
        console.log("update user successfully");
      } else {
        console.log(res.data.message);
      }
    } catch (e) {
      console.log(e);
      console.log("failed in updating user!");
    }
  };

  const handleSignOut = async (e) => {
    try {
      const res = await signOut();
      if (res.data.status === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        setIsSignedIn(false);
        history.push("/signin");
        console.log("succeeded in sign out");
      } else {
        console.log("failed in sign out");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <Card className={classes.card}>
            <CardContent>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <IconButton onClick={() => setEditFormOpen(true)}>
                    <SettingsIcon color="action" fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  <Avatar
                    alt={currentUser?.image.url}
                    className={classes.avatar}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item style={{ marginTop: "1.5rem" }}>
                  <Typography variant="body1" component="p" gutterButton>
                    {currentUser?.name}
                  </Typography>
                  <Divider style={{ marginTop: "0.5rem" }} />
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ marginTop: "0.5rem", fontWeight: "bold" }}
                  >
                    自己紹介
                  </Typography>
                  {currentUser.profile ? (
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      {currentUser.profile}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      よろしくお願いします
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    onClick={handleSignOut}
                    color="primary"
                    startIcon={<ExitToAppIcon />}
                    style={{ marginTop: "1rem" }}
                  >
                    ログアウト
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <form noValidate autoComplete="off">
            <Dialog
              open={editFormOpen}
              keepMounted
              onClose={() => setEditFormOpen(false)}
            >
              <DialogTitle style={{ textAlign: "center" }}>
                プロフィールの変更
              </DialogTitle>
              <DialogContent>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="名前"
                  value={name}
                  margin="dense"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  placeholder="1000文字以内で書いてください"
                  variant="outlined"
                  multiline
                  fullWidth
                  label="自己紹介"
                  rows="8"
                  margin="dense"
                  onChange={(e) => setProfile(e.target.value)}
                />
                <div className={classes.imageUploadBtn}>
                  <Input
                    type="file"
                    accept="image/*"
                    id="icon-button-file"
                    onChange={(e) => {
                      uploadImage(e);
                      previewImage(e);
                    }}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="画像をアップロード"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
                {preview ? (
                  <Box className={classes.box}>
                    <IconButton color="inherit" onClick={() => setPreview("")}>
                      <CancelIcon />
                    </IconButton>
                    <img
                      src={preview}
                      alt="preview"
                      className={classes.preview}
                    />
                  </Box>
                ) : null}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  disabled={!name || !profile ? true : false}
                >
                  編集
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Home;
