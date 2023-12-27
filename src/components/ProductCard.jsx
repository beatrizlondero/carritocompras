
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ product, addToCart }) => {
  const [availableStock, setAvailableStock] = useState(product.initialStock || 10); // Set an initial stock value

  const handleAddToCart = () => {
    if (availableStock > 0) {
      addToCart(product);
      setAvailableStock(availableStock - 1);
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="240"
        image={product.image}
        alt={product.title}
      />
     
       <CardContent size="md">
        <div style={{ height: '100px' }}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="h5" color="text.secondary">
            Cantidad disponible: {product.quantity}
          </Typography>
        </div>
        <Typography variant="h4" color="text.secondary">
          Precio: ${product.price}
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={() => addToCart(product)}
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? 'Sin Stock' : 'Comprar'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
