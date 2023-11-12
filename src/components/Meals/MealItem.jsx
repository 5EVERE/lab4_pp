import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

function MealItem(props) {
  const cartContext = useContext(CartContext);
  const addItem = function (amount) {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{props.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm onAddtoCart={addItem} id={props.id}></MealItemForm>
      </div>
    </li>
  );
}

export default MealItem;
