import React, { useState, useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import SubmitOrder from "./SubmitOrder";

function Cart(props) {
  const [order, setOrder] = useState(false);
  const [submittingOrNot, setSubmittingOrNot] = useState(
    <React.Fragment>
      <p>Відправка Ваших даних...</p>
    </React.Fragment>
  );
  const [orderIsSubmitting, setOrderIsSubmitting] = useState(false);
  const [orderIsSubmitted, setOrderIsSubmitted] = useState(false);

  const cartContext = useContext(CartContext);
  const hasItems = cartContext.items.length > 0;
  const addCartItemHandler = function (item) {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const removeCartItemHandler = function (id) {
    cartContext.removeItem(id);
  };

  const orderHandler = function () {
    setOrder(true);
  };

  const submitOrder = async function (userData) {
    setOrderIsSubmitting(true);
    try {
      const response = await fetch(
        "https://lab4-orders-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedMeals: cartContext.items,
          }),
        }
      );
      if (response.ok !== true) {
        setSubmittingOrNot(
          <React.Fragment>
            <p>Щось пішло не так...</p>
          </React.Fragment>
        );
        console.error("Enything wrong");
      } else {
        setOrderIsSubmitting(false);
        setOrderIsSubmitted(true);
        cartContext.clearItem();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cartItems = (
    <ul>
      {cartContext.items.map((item) => (
        <CartItem
          id={item.id}
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );
  const modalButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.modalHandler}>
        Закрити
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Замовити
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Тотал</span>
        <span>{`$${Math.abs(cartContext.totalAmount.toFixed(2))}`}</span>
      </div>
      {order && (
        <SubmitOrder
          onSubmitOrder={submitOrder}
          onCancel={props.modalHandler}
        />
      )}
      {!order && modalButtons}
    </React.Fragment>
  );

  const subtittedModalWindow = (
    <React.Fragment>
      <p>Ваше замовлення відправлено, чекайте дзвінка оператора!</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.modalHandler}>
          Закрити
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal modalHandler={props.modalHandler}>
      {!orderIsSubmitting && !orderIsSubmitted && modalContent}
      {orderIsSubmitting && submittingOrNot}
      {orderIsSubmitted && subtittedModalWindow}
    </Modal>
  );
}

export default Cart;
