import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import CheckoutModal from './CheckoutModal'

import React, { useState } from 'react';

const OrderCart = ({ cart, removeFromCart, calculateTotal, clearCart, sortOrder }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

    // Function to open the checkout modal
  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  // Function to close the checkout modal
  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };
  
    // Ordenar los productos segun los precios
    const sortedCart = [...cart].sort(comparePrices);
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#ffebb3' }}>
        <Typography variant="h3" gutterBottom color={orange[900]}>
          Carrito de Compra
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
        <div >

          <Button variant="contained" color="warning" size="large" padding="10px" onClick={clearCart}>
            Vaciar el Carro
          </Button>
        </div>
        <div className='buttons'>

          <Button variant="contained" color="success" size="large" padding="10px" onClick={handleOpenCheckout}>
            Ir al Pago
          </Button>
            {isCheckoutOpen && (
            <CheckoutModal
              cart={cart}
              handleCloseCheckout={handleCloseCheckout}
              totalAmount={calculateTotal().toFixed(2)}
              clearCart={clearCart}
            />
           )}
         </div>

      </div>
    );
  };
  
  export default OrderCart;
