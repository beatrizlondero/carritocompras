// carrito de compras
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ product, addToCart }) => {
    
  return (
    
    <Card>
      <CardMedia
        component="img"
        height="240"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <div style={{height:"100px"}}>

            <Typography variant="h4">{product.title}</Typography>
        </div>
        <Typography variant="h4" color="text.secondary">
          Price: ${product.price}
        </Typography>
        <Button variant="contained" size="large" color="success" onClick={() => addToCart(product)}>
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
