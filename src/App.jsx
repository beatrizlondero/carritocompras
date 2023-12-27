
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import ProductCard from './components/ProductCard';
import Logo from './components/Logo';
import ProductSorting from './components/ProductSorting';
import Footer from './components/Footer';
import OrderCart from './components/OrderCart';

const API_BASE_URL = 'https://fakestoreapi.com';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedProducts, setSortedProducts] = useState([]);

  
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data.map((product) => ({ ...product, quantity: 10 }))))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // order products by price
    const sortedProductsCopy = [...products];
    if (sortOrder === 'asc') {
      sortedProductsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      sortedProductsCopy.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sortedProductsCopy);
  }, [sortOrder, products]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    // Decrease the quantity of the added product
    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) =>
        prevProduct.id === product.id
          ? { ...prevProduct, quantity: prevProduct.quantity - 1 }
          : prevProduct
      )
    );
  };

  const removeFromCart = (index) => {
    const removedProduct = cart[index];
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
    // Increase the quantity of the removed product
    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) =>
        prevProduct.id === removedProduct.id
          ? { ...prevProduct, quantity: prevProduct.quantity + 1 }
          : prevProduct
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  return (
    <body>
      <Logo />
      <ProductSorting sortOrder={sortOrder} onSortChange={handleSortChange} />
      <div style={{ padding: '3px' }}>
        <Container maxWidth="false">
          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard product={product} addToCart={addToCart} />
              </Grid>
            ))}
          </Grid>
          <hr />
          <OrderCart
            cart={cart}
            removeFromCart={removeFromCart}
            calculateTotal={calculateTotal}
            clearCart={clearCart}
            sortOrder={sortOrder}
          />
        </Container>
      </div>
      <Footer />
    </body>
  );
};


export default App;

