import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [modal, setModal] = useState(false);
  const modalHandler = function () {
    setModal(!modal);
  };
  return (
    <CartContextProvider>
      {modal && <Cart modalHandler={modalHandler} />}
      <Header modalHandler={modalHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}
export default App;
