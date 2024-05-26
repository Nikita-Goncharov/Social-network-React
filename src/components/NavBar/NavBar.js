import {NavLink} from 'react-router-dom'
import styles from './NavBar.module.css'
import {RenderIfAuthorized} from "../common/RenderIfAuthorized/RenderIfAuthorized";

export const NavBar = () => {
  return (
      <nav className={styles.navbar}>
        <ul>
          <li><NavLink to="/home" className={({isActive}) => isActive ? styles.active : ''}>Home</NavLink></li>
          <RenderIfAuthorized
            render={<li><NavLink to="/profile" className={({isActive}) => isActive ? styles.active : ''}>Profile</NavLink></li>}
          />
          <li><NavLink to="/messages" className={({isActive}) => isActive ? styles.active : ''}>Messages</NavLink></li>
          <li><NavLink to="/find-profiles" className={({isActive}) => isActive ? styles.active : ''}>Find profiles</NavLink></li>
          <li><NavLink to="/settings" className={({isActive}) => isActive ? styles.active : ''}>Settings</NavLink></li>
        </ul>
      </nav>
  )
}
