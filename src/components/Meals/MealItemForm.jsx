import React, { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";

function MealItemForm(props) {
  const amountRef = useRef();
  const [validSubmit, setValidSubmit] = useState(false);
  const submitHandler = function (event) {
    event.preventDefault();
    const inputAmount = amountRef.current.value;
    if (
      inputAmount.trim().length === 0 ||
      +inputAmount < 1 ||
      +inputAmount > 100
    ) {
      setValidSubmit(true);
      return;
    }
    setValidSubmit(false);
    props.onAddtoCart(+inputAmount);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        ref={amountRef}
        label="Кількість"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>Добавити</button>
      {validSubmit && <p>Помилкове введення</p>}
    </form>
  );
}

export default MealItemForm;
