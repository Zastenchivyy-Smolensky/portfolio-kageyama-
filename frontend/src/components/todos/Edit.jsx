import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { useState } from "react";
import { useCallback } from "react";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { editProduct, getDetail } from "../../lib/api/products";
const useStyles = makeStyles((theme) => ({
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
function Edit() {
  const createFormData = () => {
    const formData = new FormData();
    formData.append("title", title || "");
    formData.append("image", image);
    return formData;
  };
  const classes = useStyles();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const query = useParams();

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  // 画像プレビュー
  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);
  useEffect(() => {
    handleGetEdit(query);
  }, [setData]);

  const handleGetEdit = async (query) => {
    try {
      const res = await getDetail(query.id);
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = createFormData();
    try {
      const res = await editProduct(query.id, data);
      console.log(res);
      if (res.status === 200) {
        setEditFormOpen(false);
        console.log("update user successfully!");
      } else {
        console.log(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
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
              <Avatar alt="avatar" src={data.image?.url} />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item style={{ marginTop: "1.5rem" }}>
              <Typography variant="body1" component="p" gutterBottom>
                {data.title}
              </Typography>
              <Divider style={{ marginTop: "0.5rem" }} />
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
            プロダクトの変更
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="アプリの名前"
              value={title}
              margin="dense"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={classes.imageUploadBtn}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e) => {
                  uploadImage(e);
                  previewImage(e);
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
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
                  alt="preview img"
                  className={classes.preview}
                />
              </Box>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!title || !image ? true : false}
            >
              送信
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

export default Edit;
