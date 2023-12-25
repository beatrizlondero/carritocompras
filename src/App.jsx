// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Stack } from '@mui/material';
// import ProductCard from './components/ProductCard';
// import Cart from './components/Cart';
// import Logo from './components/Logo';
// import ProductSorting from './components/Form';
// import Stats from './components/Stats';
// import OrderCart from './components/OrderPriceCart';

// const API_BASE_URL = 'https://fakestoreapi.com';

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortOrder, setSortOrder] = useState('asc');


  
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/products`)
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (index) => {
//     const newCart = [...cart];
//     newCart.splice(index, 1);
//     setCart(newCart);
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, product) => total + product.price, 0);
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const filteredProducts = selectedCategory === 'all'
//     ? products
//     : products.filter((product) => product.category === selectedCategory);

//     const renderProducts = () => {
//       return (
//         <Grid container spacing={3}>
//           {products.map((product) => (
//             <Grid item key={product.id} xs={12} sm={6} md={4}>
//               {/* Use the ProductCard component */}
//               <ProductCard product={product} addToCart={addToCart} />
//             </Grid>
//           ))}
//         </Grid>
//       );
//     };
//     const handleSortChange = (newSortOrder) => {
      
//       setSortOrder(newSortOrder);
//       renderCart2();
//       // <OrderCart cart={cart} remuveFromCart={removeFromCart} calculateTotal={ calculateTotal} clearCart={clearCart} sortOrder />
     
//     };  
//     const renderCart2 = () => {
//       // Sort the cart based on sortOrder
//       const sortedCart = [...cart];
//       if (sortOrder === 'asc') {
//         sortedCart.sort((a, b) => a.price - b.price);
//         console.log("paso por aqui asc")
//       } else if (sortOrder === 'desc') {
//         sortedCart.sort((a, b) => b.price - a.price);
//       }
//       return (
//         <OrderCart
//           cart={sortedCart}
//           removeFromCart={removeFromCart}
//           calculateTotal={calculateTotal}
//           clearCart={clearCart}
//         />
//       );
//     }
 
//   const renderCart = () => (
//     <Cart cart={cart} removeFromCart={removeFromCart} calculateTotal={calculateTotal} clearCart={clearCart} />
//   );

//   return (
//     <body>

//       <Logo/>
//       <ProductSorting onSortChange={handleSortChange} />
//       <div style={{padding: "3px"}}>
//       {/* <Button variant="outlined" onClick={ProductList}>
//         Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
//       </Button> */}
//         <Container maxWidth="false"> 
//           {/* <Typography variant="h4" align="center" gutterBottom>
//             My Store
//           </Typography> */}
//           {renderProducts()}
//           <hr />
//           {renderCart()}
//         </Container>
//       </div>
//       <Stats/>

//     </body>
//   );
// };



// export default App;

import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Logo from './components/Logo';
import ProductSorting from './components/Form';
import Stats from './components/Stats';
import OrderCart from './components/OrderPriceCart';

const API_BASE_URL = 'https://fakestoreapi.com';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Sort the products based on sortOrder
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
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  // const handleSortChange = (newSortOrder) => {
  //   setSortOrder(newSortOrder);
  // };

  // return (
  //   <body>
  //     <Logo />
  //     <ProductSorting onSortChange={handleSortChange} />
  //     <div style={{ padding: "3px" }}>
  //       <Container maxWidth="false">
  //         <Grid container spacing={3}>
  //           {sortedProducts.map((product) => (
  //             <Grid item key={product.id} xs={12} sm={6} md={4}>
  //               <ProductCard product={product} addToCart={addToCart} />
  //             </Grid>
  //           ))}
  //         </Grid>
  //         <hr />
  //         <OrderCart
  //           cart={cart}
  //           removeFromCart={removeFromCart}
  //           calculateTotal={calculateTotal}
  //           clearCart={clearCart}
  //           sortOrder={sortOrder}
  //         />
  //       </Container>
  //     </div>
  //     <Stats />
  //   </body>
  // );
// };
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
    <Stats />
  </body>
);
};


export default App;

