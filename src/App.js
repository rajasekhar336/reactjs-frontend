import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>My E-Commerce</h1>
      <ProductList addToCart={addToCart} />
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      {cartItems.length > 0 && !showCheckout && (
        <button onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
      )}
      {showCheckout && <Checkout cartItems={cartItems} />}
    </div>
  );
}

export default App;
