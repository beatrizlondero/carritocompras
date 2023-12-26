import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { orange } from '@mui/material/colors';
import CheckoutModal from './CheckoutModal';

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

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // crea un map con las cantidades de los productos
  const productQuantities = {};

  // actualiza los productos y cantidades en el map
  cart.forEach((product) => {
    const productId = product.id;
    if (productId in productQuantities) {
      productQuantities[productId].quantity++;
    } else {
      productQuantities[productId] = { product, quantity: 1 };
    }
  });

  // Ordenar los productos segun los precios
  const sortedCart = Object.values(productQuantities).map(({ product }) => product).sort(comparePrices);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#ffebb3' }}>
      <Typography variant="h3" gutterBottom color={orange[900]}>
        Carrito de Compra
      </Typography>
      <List>
        {sortedCart.map((product) => (
          <ul key={product.id} style={{ fontSize: '50px', width: '800px', marginBottom: '15px', color: '#5a3e2b' }}>
            <div>
              <li style={{ fontSize: '2rem', marginRight: '10px' }}>
                {product.title}
                <span style={{ fontSize: '2rem', marginRight: '10px', marginLeft: '10px', color: 'green' }}>
                  {`$${product.price} x ${productQuantities[product.id].quantity}`}
                </span>
                <Button variant="outlined" color="warning" size="large" onClick={() => removeFromCart(cart.indexOf(product))}>
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
      <div>
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


