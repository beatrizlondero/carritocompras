import React from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { orange } from '@mui/material/colors';

//carta de productos
const Cart = ({ cart, removeFromCart, calculateTotal, clearCart }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding:"20px", backgroundColor: "#ffebb3" }}>
      <Typography variant="h3" gutterBottom color={orange[900]}>
        Shopping Cart
      </Typography>
      <List>
        {cart.map((product, index) => (
            <ul style={{ fontSize:'50px',width: '800px', marginBottom: '15px', color:'#5a3e2b' }}>
               <div> <li style={{fontSize:"2rem", marginRight:"10px"}}> {product.title }
                        <span style={{fontSize:"2rem", marginRight:"10px", marginLeft:"10px", color:"green"}} >{`$${product.price}`}</span>
                        <Button variant="outlined" color="warning" size='large' onClick={() => removeFromCart(index)}>
                               Remove
                        </Button></li>
               </div>
            </ul>
       
        ))}
      </List>
      <Typography variant="h3" gutterBottom>
        Total: ${calculateTotal().toFixed(2)}
      </Typography>
      <Button variant="contained" color="warning" size='large' onClick={clearCart}>
        Clear Cart
      </Button>
    </div>
  );
};

export default Cart;
