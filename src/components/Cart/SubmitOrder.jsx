import React, { useState, useRef } from "react";
import styles from "./SubmitOrder.module.css";

const isInputValid = (inputValue) => inputValue.trim() !== "";

function SubmitOrder(props) {
  const [formValidity, setFormValidity] = useState({
    name: true,
    city: true,
    address: true,
  });
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();
  const confirmOrderHandler = function (event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const isEnteredNameValid = isInputValid(enteredName);
    const isEnteredCityValid = isInputValid(enteredCity);
    const isEnteredAddressValid = isInputValid(enteredAddress);

    setFormValidity({
      name: isEnteredNameValid,
      city: isEnteredCityValid,
      address: isEnteredAddressValid,
    });

    const isFormValid =
      isEnteredNameValid && isEnteredCityValid && isEnteredAddressValid;

    if (!isFormValid) {
      return;
    }

    props.onSubmitOrder({
      name: enteredName,
      city: enteredCity,
      address: enteredAddress,
    });
  };

  const nameInputClasses = `${styles.control} ${
    formValidity.name ? "" : styles.invalid
  }`;
  const cityInputClasses = `${styles.control} ${
    formValidity.city ? "" : styles.invalid
  }`;
  const addressInputClasses = `${styles.control} ${
    formValidity.address ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmOrderHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Введіть ім'я</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formValidity.name && <p>Будь ласка введіть ім'я</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">Введіть Назву Міста</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formValidity.city && <p>Будь ласка введіть місто</p>}
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="address">Введіть Адрес</label>
        <input type="text" id="address" ref={addressInputRef}></input>
        {!formValidity.address && <p>Будь ласка введіть адрес</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Підтвердити Замовлення</button>
        <button type="button" onClick={props.onCancel}>
          Відмінити
        </button>
      </div>
    </form>
  );
}

export default SubmitOrder;
