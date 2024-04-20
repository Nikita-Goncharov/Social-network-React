import styles from './MainContent.module.css'
import {Route, Routes} from 'react-router-dom'
import Home from "../Home/Home"
import Settings from "../Settings/Settings"
import Page404 from "../ErrorPages/Page404"
import MessagesContainer from "../Messages/MessagesContainer";
import FindUsersContainer from "../FindUsers/FindUsersContainer"
import ProfileContainer from "../Profile/ProfileContainer";

const MainContent = () => {
  return (
      <div className={styles.main_content}>
        <Routes>
          {/* Way of adding routes is not matter */}
          <Route element={<Home />} path=""/>
          <Route element={<Home />} path="/home"/>
          <Route element={<ProfileContainer />} path="/profile"/>
          <Route element={<ProfileContainer />} path="/profile/:userId"/>
          <Route element={<Settings />} path="/settings"/>
          <Route element={<MessagesContainer />} path="/messages"/>
          <Route element={<FindUsersContainer />} path="/find_users"/>
          <Route element={<Page404 />} path="*"/>
        </Routes>
      </div>
  )
}

export default MainContent