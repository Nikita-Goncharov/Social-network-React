import Profile from "../Profile/Profile"
import styles from './MainContent.module.css'
import {Route, Routes} from 'react-router-dom'
import Home from "../Home/Home"
import Settings from "../Settings/Settings"
import Page404 from "../ErrorPages/Page404"
import MessagesContainer from "../Messages/MessagesContainer";
import FindUsersContainer from "../FindUsers/FindUsersContainer"

const MainContent = () => {
  return (
      <div className={styles.main_content}>
        <Routes>
          <Route element={<Home />} path=""/>
          <Route element={<Home />} path="/home"/>
          <Route element={<Profile />} path="/profile"/>
          <Route element={<Settings />} path="/settings"/>
          <Route element={<MessagesContainer />} path="/messages"/>
          <Route element={<FindUsersContainer />} path="/find_users"/>
          <Route element={<Page404 />} path="*"/>
        </Routes>
      </div>
  )
}

export default MainContent