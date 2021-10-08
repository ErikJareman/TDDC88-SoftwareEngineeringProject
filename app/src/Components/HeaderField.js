/**
 * HeaderField.js
 *
 * Top header which is constant across all pages
 *
 * function HeaderField() - Philip Nylén - FINAL
 */

import headerLogo from "../assets/headerLogo.png";
import "./HeaderField.css";

export default function HeaderField() {
  return (
    <div id="headerArea">
      <img src={headerLogo} className="header-logo" alt="Not found" />
      <h1 id="headerText"> Norrköping</h1>
    </div>
  );
}
