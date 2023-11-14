import React, { useState, useEffect } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleAuthProvider } from "./firebase";
import styles from "./AuthProvider.module.css";
import AuthModal from "./AuthModal";
import SubmitOrder from "../Cart/SubmitOrder";

function AuthProvider() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const submitOrderFalse = false;

  const [login, setLogin] = useState(false);
  const [modal, setModal] = useState(false);

  const loginHandler = function () {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      if (maybeUser != null) {
        return setUser(maybeUser);
      }
      signInWithPopup(auth, googleAuthProvider)
        .then((credentials) => setUser(credentials.user))
        .catch((e) => console.error(e));
    });

    setLogin(true);
    return unsub;
  };

  const profileHandler = function () {
    setModal(!modal);
  };
  return (
    <div className={styles["auth-google"]}>
      {!login && (
        <button onClick={loginHandler} className={styles.button}>
          Login
        </button>
      )}
      {login && (
        <button onClick={profileHandler} className={styles.button}>
          Profile
        </button>
      )}
      {modal && <AuthModal profileHandler={profileHandler} user={user.email} />}
    </div>
  );
}

export default AuthProvider;
