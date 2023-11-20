import Profile from "../Profile/Profile"
import Messages from "../Messages/Messages"
import styles from './MainContent.module.css'
import {Route, Routes} from 'react-router-dom'
import Home from "../Home/Home"
import Settings from "../Settings/Settings"
const MainContent = () => {
  return (
      <div className={styles.main_content}>
        <Routes>
          <Route element={<Profile />} path=""/>
          <Route element={<Home />} path="/home"/>
          <Route element={<Profile />} path="/profile"/>
          <Route element={<Settings />} path="/settings"/>
          <Route element={<Messages />} path="/messages"/>
        </Routes>
      </div>
  )
}

export default MainContent