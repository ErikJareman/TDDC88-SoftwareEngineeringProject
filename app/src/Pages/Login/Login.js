/**
 * Login.js
 *
 * function Login() - Erik Jareman - DRAFT
 *
 * Documentation not complete.
 */

import "./Login.css";
import LoginForm from "../../Components/LoginForm";
import { useState } from "react";

/**
 * Login() contains logic for the login/logout functionality
 * and returns what to be displayed on the login page.
 * Erik Jareman
 * DRAFT
 */
export default function Login() {
  const temporaryLoginAccount = {
    userID: "123",
    password: "admin",
  };

  const [user, setUser] = useState({ userID: "", password: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    if (
      details.userID === temporaryLoginAccount.userID &&
      details.password === temporaryLoginAccount.password
    ) {
      setUser({
        userID: details.userID,
      });
    } else {
      setError("Felaktigt konto / lösenord");
    }
  };

  const Logout = () => {
    setUser({ userID: "" });
  };

  return (
    <div className="page-container">
      {user.userID !== "" ? (
        <div className="welcome">
          Welcome <span>{user.userID}</span>.
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}
