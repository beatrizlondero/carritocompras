import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { orange } from '@mui/material/colors';

import React, { useState } from 'react';

const OrderCart = ({ cart, removeFromCart, calculateTotal, clearCart, sortOrder }) => {
    // Function para ordenar por precio
    const comparePrices = (a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else if (sortOrder === 'desc') {
        return b.price - a.price;
      } else {
        return 0; 
      }
    };
  
    // Ordenar los productos segun los precios
    const sortedCart = [...cart].sort(comparePrices);
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#ffebb3' }}>
        <Typography variant="h3" gutterBottom color={orange[900]}>
          Shopping Cart
        </Typography>
        <List>
          {sortedCart.map((product, index) => (
            <ul style={{ fontSize: '50px', width: '800px', marginBottom: '15px', color: '#5a3e2b' }}>
              <div>
                <li style={{ fontSize: '2rem', marginRight: '10px' }}>
                  {product.title}
                  <span style={{ fontSize: '2rem', marginRight: '10px', marginLeft: '10px', color: 'green' }}>
                    {`$${product.price}`}
                  </span>
                  <Button variant="outlined" color="warning" size="large" onClick={() => removeFromCart(index)}>
                    Remove
                  </Button>
                </li>
              </div>
            </ul>
          ))}
        </List>
        <Typography variant="h3" gutterBottom>
          Total: ${calculateTotal().toFixed(2)}
        </Typography>
        <Button variant="contained" color="warning" size="large" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    );
  };
  
  export default OrderCart;
