import React, { useEffect, useState } from "react";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ProductItem from "./ProductItem";
import Modal from "./Modal";
import { getProducts } from "../../lib/api/products";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem",
  },
}));
const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleGetProduct = async () => {
    const { data } = await getProducts();
    setProducts(data.products);
  };
  useEffect(() => {
    handleGetProduct();
  }, []);
  const ShowModal = () => {
    setShowModal(true);
  };
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <button onClick={ShowModal}>Open Modal</button>
          <Modal showFlag={showModal} setShowModal={setShowModal} />
          {products?.map((product) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                handleGetProduct={handleGetProduct}
              />
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
