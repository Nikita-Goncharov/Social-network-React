import styles from './MainContent.module.css'
import {Route, Routes} from 'react-router-dom'
import Home from "../Home/Home"
import Settings from "../Settings/Settings"
import Page404 from "../ErrorPages/Page404"
import MessagesContainer from "../Messages/MessagesContainer";
import FindProfilesContainer from "../FindProfiles/FindProfilesContainer"
import ProfileContainer from "../Profile/ProfileContainer";
import LoginUserContainer from "../Auth/LoginUser/LoginUserContainer";
import LogoutUserContainer from "../Auth/LogoutUser/LogoutUser"
import RegisterUserContainer from "../Auth/RegisterUser/RegisterUserContainer";
import {connect} from "react-redux";


const MainContent = (props) => {
  return (
      <div className={styles.main_content}>
        <Routes>
          {/* Way of adding routes is not matter */}
          <Route element={<Home />} path=""/>
          <Route element={<Home />} path="/home"/>
          {props.ownProfile.user.isAuthorized ? <Route element={<ProfileContainer />} path="/profile"/> : <></>}
          <Route element={<ProfileContainer />} path="/profile/:profileId"/>
          <Route element={<Settings />} path="/settings"/>
          <Route element={<MessagesContainer />} path="/messages"/>
          <Route element={<FindProfilesContainer />} path="/find-profiles"/>

          <Route element={<RegisterUserContainer />} path="/register"/>
          <Route element={<LoginUserContainer />} path="/login"/>
          <Route element={<LogoutUserContainer />} path="/logout"/>
          <Route element={<Page404 />} path="*"/>
        </Routes>
      </div>
  )
}

const mapStateToProps = (state) => ({
  ownProfile: state.ownProfile.profile
})

const MainContentContainer = connect(mapStateToProps, {})(MainContent)
export default MainContentContainer