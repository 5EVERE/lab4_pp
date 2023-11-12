import React from "react";
//import sushiImage from "../../assets/sushi.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = function (props) {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Онлайн Піца</h1>
        <HeaderCartButton modalHandler={props.modalHandler}/>
      </header>
      {/* <div className={styles["main-image"]}>
        <img alt="Блюда"></img>
      </div> */}
    </React.Fragment>
  );
};
export default Header;
