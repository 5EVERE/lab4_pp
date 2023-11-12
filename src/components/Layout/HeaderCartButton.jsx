import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const cartContext = useContext(CartContext);
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);
  const currentItemNumber = cartContext.items.reduce(
    (accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    },
    0
  );
  const buttonClasses = `${styles.button} ${
    isButtonAnimated ? styles.bump : ""
  }`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setIsButtonAnimated(true);
    const timer = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={buttonClasses} onClick={props.modalHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Кошик</span>
      <span className={styles.badge}>{currentItemNumber}</span>
    </button>
  );
}

export default HeaderCartButton;
