import React from "react";
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

function Header(props) {
  let registerButton = <NavLink className={styles.register_link} to="/register">Register</NavLink>
  let loginButton = <NavLink className={styles.login_link} to="/login">Login</NavLink>
  let logoutButton = <NavLink className={styles.logout_link} to="/logout">Logout</NavLink>
  return (
    <header className={styles.header}>
      <div>
        <div>
          <h2>Custom social network</h2>
          <img src="https://cdn-icons-png.flaticon.com/128/5968/5968771.png" alt="Logo"/>
        </div>
        <div className={styles.authorization_links}>
          {!props.isAuthorized && registerButton}
          {!props.isAuthorized && loginButton}
          {props.isAuthorized && logoutButton}
        </div>
      </div>
    </header>
  )
}

export default Header;