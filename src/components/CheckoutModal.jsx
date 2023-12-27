
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
  const [cardSecurityCode, setCardSecurityCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardSecurityCodeChange = (event) => {
    const input = event.target.value;
    if (!/^\d*$/.test(input)) {
      alert('Please enter only numerical digits for the card security code.');
    } else {
      setCardSecurityCode(input);
    }
  };

  const handleCardholderNameChange = (event) => {
    setCardholderName(event.target.value);
  };

  const handleConfirmPurchase = () => {
    if (paymentMethod === 'card' && cardNumber.trim() === '') {
      alert('Por favor ingrese un numero de tarjeta valido.');
    } else if (paymentMethod === 'card' && cardSecurityCode.trim() === '') {
      alert('Por favor ingrese un numero de codigo de seguridad valido.');
    } else if (paymentMethod === 'card' && cardholderName.trim() === '') {
      alert('Por favor ingrese el nombre del titular de la tarjeta.');
    } else {
      alert('Compra exitosa! Gracias por elegirnos.');
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
          <Typography variant="h5">Seccion de pago</Typography>
            {/* muestra el total */}
          <Typography variant="subtitle1">Importe Total a pagar: ${totalAmount}</Typography>

          {/* muestra los productos */}
          <List>
            {cart.reduce((acc, product) => {
              const existingProduct = acc.find((item) => item.id === product.id);
              if (existingProduct) {
                existingProduct.quantity += 1;
              } else {
                acc.push({ ...product, quantity: 1 });
              }
              return acc;
            }, []).map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.title} (Cantidad: ${item.quantity})`} secondary={`$${item.price.toFixed(2)}`} />
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
              <FormControlLabel value="card" control={<Radio />} label="Tarjeta" />
            </RadioGroup>
          </FormControl>

          {/* datos de la tarjeta visibles solo cuando elige tarjeta */}
          {paymentMethod === 'card' && (
            <>
              <CreditCardInput cardNumber={cardNumber} handleCardNumberChange={handleCardNumberChange} />
              <TextField
                label="Código de seguridad"
                variant="outlined"
                fullWidth
                margin="normal"
                value={cardSecurityCode}
                onChange={handleCardSecurityCodeChange}
                inputProps={{
                  maxLength: 4,
                  pattern: '[0-9]*',
                }}
              />
              <TextField
                label="Nombre titular de la tarjeta"
                variant="outlined"
                fullWidth
                margin="normal"
                value={cardholderName}
                onChange={handleCardholderNameChange}
              />
            
            </>
          )}

          <div className="buttons">
            <Button variant="contained" color="error" onClick={handleConfirmPurchase}>
              Confirmar Compra
            </Button>
          </div>
          <div className="buttons">
            <Button variant="outlined" color="secondary" onClick={handleBackToStore}>
              Volver a la tienda
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CheckoutModal;

