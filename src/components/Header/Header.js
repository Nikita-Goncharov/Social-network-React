import React from "react";
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <div>
          <h2>Custom social network</h2>
          <img src="https://cdn-icons-png.flaticon.com/128/5968/5968771.png" alt="Logo"/>
        </div>
        <div className={styles.authorization_links}>
          <NavLink className={styles.register_link} to="/register">Register</NavLink>
          <NavLink className={styles.login_link} to="/login">Login</NavLink>
          {/*/!*<NavLink className={styles.logout_link} to="/logout">Logout</NavLink>*!/  TODO: logout option */}
        </div>
      </div>
    </header>
  )
}

export default Header;