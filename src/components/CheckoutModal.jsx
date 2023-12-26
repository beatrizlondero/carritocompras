
import React, { useState } from 'react';
import {
  Modal,
  Fade,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';

const CreditCardInput = ({ cardNumber, handleCardNumberChange }) => {
    const formatCardNumber = (value) => {
      const numericValue = value.replace(/\D/g, '');
      const formattedValue = numericValue.replace(/(\d{4})/g, '$1-');
      const finalValue = formattedValue.slice(0, 19); // Limit to 16 digits
      return finalValue;
    };
  
    return (
      <TextField
        label="Card Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formatCardNumber(cardNumber)}
        onChange={(e) => handleCardNumberChange(e)}
        inputProps={{
          maxLength: 19,
          pattern: '[0-9]*',
        }}
      />
    );
  };
  

const CheckoutModal = ({ cart, handleCloseCheckout, totalAmount, clearCart }) => {
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const [cardNumber, setCardNumber] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleConfirmPurchase = () => {
    if (paymentMethod === 'card' && cardNumber.trim() === '') {
      alert('Por favor ingrese un numero de tarjeta valido.');
    } else {
      alert('La compra fue exitosa, gracias por elegirnos!.');
      clearCart();
      handleCloseCheckout();
    }
  };

  const handleBackToStore = () => {
    handleCloseCheckout();
  };

  return (
    <Modal open={true} onClose={handleCloseCheckout} closeAfterTransition>
      <Fade in={true}>
        <div style={{ backgroundColor: 'white', padding: 20, maxWidth: 400, margin: 'auto', fontSize: '16px' }}>
          <Typography variant="h5">Seccion de Pago</Typography>

          {/* Muestra el importe total */}
          <Typography variant="subtitle1">Importe Total: ${totalAmount}</Typography>

          {/* Muestra los items de las compras */}
          <List>
            {cart.map((product, index) => (
              <ListItem key={index}>
                <ListItemText primary={product.title} secondary={`$${product.price.toFixed(2)}`} />
              </ListItem>
            ))}
          </List>

          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="payment-method"
              name="payment-method"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Efectivo" />
              <FormControlLabel value="card" control={<Radio />} label="Tarjeta de Debito" />
            </RadioGroup>
          </FormControl>

          {/* Card input (visible solo cuando se elige tarjeta) */}
          {paymentMethod === 'card' && (
            <CreditCardInput cardNumber={cardNumber} handleCardNumberChange={handleCardNumberChange} />
          )}

          <div className="buttons">
            <Button variant="contained" color="error" onClick={handleConfirmPurchase}>
              Confirmar Compra
            </Button>
          </div>
          <div className="buttons">
            <Button variant="outlined" color="secondary" onClick={handleBackToStore}>
              Volver a la Tienda
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CheckoutModal;
