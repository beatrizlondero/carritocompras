// 
import React, { useState } from 'react';
import { Modal, Fade, Typography, TextField, Button, List, ListItem, ListItemText, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';

const CheckoutModal = ({ cart, handleCloseCheckout, totalAmount, clearCart}) => {
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const [cardNumber, setCardNumber] = useState('');
  //const importeTotal = parseFloat(totalAmount);
    console.log(totalAmount);
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  
    const handleConfirmPurchase = () => {
      // proceso simulado de pago
      if (paymentMethod === 'card' && cardNumber.trim() === '') {
        //error si esta en blanco
        alert('Please enter a valid card number.');
      } else {
        // simula una compra exitosa
        alert('La compra fue exitosa, gracias por elegirnos!.');
        clearCart();
        
        handleCloseCheckout();
      }
    };
  
    const handleBackToStore = () => {
      handleCloseCheckout();
    };
  
    return (
        <Modal
        open={true} // se asegura que este abierto
        onClose={handleCloseCheckout}
        closeAfterTransition
    >
        <Fade in={true}>
            <div style={{ backgroundColor: 'white', padding: 20, maxWidth: 400, margin: 'auto',fontSize: '16px' }}>
                <Typography variant="h5">Seccion de Pago</Typography>

                {/* Display total amount */}
              <Typography variant="subtitle1">Importe Total: ${totalAmount}</Typography>

                {/* Display items being purchased */}
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
                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="card" control={<Radio />} label="Debit Card" />
              </RadioGroup>
            </FormControl>
  
            {/* Card input (visible only when paying with a card) */}
            {paymentMethod === 'card' && (
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            )}
  
                <div className='buttons'>

                    <Button variant="contained" color="error" onClick={handleConfirmPurchase}>
                        Confirmar Compra
                    </Button>
                </div>
                <div className='buttons'>
                    <Button variant="outlined" color="secondary" onClick={handleBackToStore}>
                        Volver a la Tienda
                    </Button>

                </div>
            </div>
        </Fade>
    </Modal>
    //   <Modal
    //     open={true}
    //     onClose={handleCloseCheckout}
    //     closeAfterTransition
    //     BackdropComponent={Backdrop}
    //     BackdropProps={{ timeout: 500 }}
    //   >
    //     <Fade in={true}>
    //       <div>
    //         <Typography variant="h5" gutterBottom>
    //           Checkout
    //         </Typography>
  
    //         {/* Payment method selection */}
    //         <FormControl component="fieldset">
    //           <RadioGroup
    //             row
    //             aria-label="payment-method"
    //             name="payment-method"
    //             value={paymentMethod}
    //             onChange={handlePaymentMethodChange}
    //           >
    //             <FormControlLabel value="cash" control={<Radio />} label="Cash" />
    //             <FormControlLabel value="card" control={<Radio />} label="Debit Card" />
    //           </RadioGroup>
    //         </FormControl>
  
    //         {/* Card input (visible only when paying with a card) */}
    //         {paymentMethod === 'card' && (
    //           <TextField
    //             label="Card Number"
    //             variant="outlined"
    //             fullWidth
    //             margin="normal"
    //             value={cardNumber}
    //             onChange={handleCardNumberChange}
    //           />
    //         )}
  
    //         <div>
    //           <Button variant="contained" color="primary" onClick={handleConfirmPurchase}>
    //             Confirm Purchase
    //           </Button>
    //           <Button variant="outlined" color="secondary" onClick={handleBackToStore}>
    //             Back to Store
    //           </Button>
    //         </div>
    //       </div>
    //     </Fade>
    //   </Modal>
    );
  };
  
  export default CheckoutModal;