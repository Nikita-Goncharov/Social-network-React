import styles from './NavBar.module.css'
import {NavLink} from 'react-router-dom'
const NavBar = () => {
  return (
      <nav className={styles.navbar}>
        <ul>
          <li><NavLink to="/home" className={({isActive}) => isActive ? styles.active : ''}>Home</NavLink></li>
          <li><NavLink to="/profile" className={({isActive}) => isActive ? styles.active : ''}>Profile</NavLink></li>
          <li><NavLink to="/settings" className={({isActive}) => isActive ? styles.active : ''}>Settings</NavLink></li>
          <li><NavLink to="/messages" className={({isActive}) => isActive ? styles.active : ''}>Messages</NavLink></li>
        </ul>
      </nav>
  )
}

export default NavBar