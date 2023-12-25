import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, selectedCategory, addToCart }) => {
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <Grid container spacing={3}>
      {filteredProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          {/* Use the ProductCard component */}
          <ProductCard product={product} addToCart={addToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;