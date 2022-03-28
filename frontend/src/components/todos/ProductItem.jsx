import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { Link } from "react-router-dom";
import { deleteProduct } from "../../lib/api/products";
import Users from "../pages/Users";

const useStyles = makeStyles(() => ({
  card: {
    width: 320,
    marginTop: "2rem",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)",
    },
  },
  delete: {
    marginLeft: "auto",
  },
}));

const PostItem = ({ product, handleGetPosts }) => {
  const classes = useStyles();
  const [like, setLike] = useState(false);

  const handleDeletePost = async (id) => {
    await deleteProduct(id).then(() => {
      handleGetPosts();
    });
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar>{Users?.image?.url}</Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="User Name"
        />
        {product.image?.url ? (
          <CardMedia component="img" src={product.image.url} alt="post image" />
        ) : null}
        <CardContent>
          <Link to={`/edit/${product.id}`}>
            <Typography variant="body2" color="textSecondary" component="span">
              {product.title.split("¥n").map((title, index) => {
                return <p key={index}>{title}</p>;
              })}
            </Typography>
          </Link>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => (like ? setLike(false) : setLike(true))}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <div className={classes.delete}>
            <IconButton onClick={() => handleDeletePost(product.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default PostItem;
