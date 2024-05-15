import styles from './NavBar.module.css'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
const NavBar = (props) => {
  return (
      <nav className={styles.navbar}>
        <ul>
          <li><NavLink to="/home" className={({isActive}) => isActive ? styles.active : ''}>Home</NavLink></li>
          {
            props.ownProfile.user.isAuthorized ?
              <li><NavLink to="/profile" className={({isActive}) => isActive ? styles.active : ''}>Profile</NavLink></li>
              :
              <></>
          }
          <li><NavLink to="/messages" className={({isActive}) => isActive ? styles.active : ''}>Messages</NavLink></li>
          <li><NavLink to="/find-profiles" className={({isActive}) => isActive ? styles.active : ''}>Find users</NavLink></li>
          <li><NavLink to="/settings" className={({isActive}) => isActive ? styles.active : ''}>Settings</NavLink></li>
        </ul>
      </nav>
  )
}

const mapStateToProps = (state) => ({
  ownProfile: state.ownProfile.profile
})

const NavBarContainer = connect(mapStateToProps, {})(NavBar)
export default NavBarContainer