import React, { useEffect, useState } from "react";
import { getProducts } from "../../lib/api/products";

import ProductForm from "./ProductForm";

const modalContent = {
  background: "white",
  padding: "10px",
  borderRadius: "3px",
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
function Modal(props) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const handleGetProduct = async () => {
    const { data } = await getProducts();
    setProducts(data.products);
  };
  useEffect(() => {
    handleGetProduct();
  }, []);
  const closeModal = () => {
    props.setShowModal(false);
  };
  return (
    <div>
      {props.showFlag ? (
        <div id="overlay" style={overlay}>
          <div id="modalContent" style={modalContent}>
            <ProductForm handleGetProduct={handleGetProduct} />
            <button onClick={closeModal}>閉じる</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Modal;
