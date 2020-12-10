import React from 'react';
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <div>
      <Link to="/outlet">Outlet</Link>
      <h2>Product</h2>
    </div>
  )
}

export default Product;