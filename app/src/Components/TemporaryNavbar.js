/**
 * LoginForm.js
 *
 * NavBar component used only for testing, will be deleted
 *
 * function TemporaryNavbar() - Erik Jareman
 */

import { Link } from "react-router-dom";

export default function TemporaryNavbar() {
  return (
    <nav style={{ backgroundColor: "lightGrey" }}>
      ----- This is a temporary navbar used only for development -----
      <ul>
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/patient">Patient Page</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
      </ul>
    </nav>
  );
}
