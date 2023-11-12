import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItem: () => {},
  //це все макет, тут функцій і значень може і не бути.
});

export default CartContext;
