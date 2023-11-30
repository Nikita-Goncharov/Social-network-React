import React from "react";
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h2>Custom social network</h2>
        <img src="https://cdn-icons-png.flaticon.com/128/5968/5968771.png" alt="Logo"/>
      </div>

    </header>
  )
}

export default Header;