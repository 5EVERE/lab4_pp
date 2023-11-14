import React from "react";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import AuthProvider from "./AuthProvider";

const Header = function (props) {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Онлайн Піца</h1>
        <AuthProvider/>
        <HeaderCartButton modalHandler={props.modalHandler}/>
      </header>
    </React.Fragment>
  );
};
export default Header;
