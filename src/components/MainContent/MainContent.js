import React from "react";
import {connect} from "react-redux";
import {Route, Routes} from 'react-router-dom'

import Home from "../Home/Home"
import Settings from "../Settings/Settings"
import Page404 from "../ErrorPages/Page404"
import styles from './MainContent.module.css'
import ProfileContainer from "../Profile/ProfileContainer";
import MessagesContainer from "../Messages/MessagesContainer";
import LogoutUserContainer from "../Auth/LogoutUser/LogoutUser"
import LoginUserContainer from "../Auth/LoginUser/LoginUserContainer";
import FindProfilesContainer from "../FindProfiles/FindProfilesContainer"
import RegisterUserContainer from "../Auth/RegisterUser/RegisterUserContainer";

const MainContent = (props) => {
  return (
    <div className={styles.main_content}>
      <Routes>
        {/* Way of adding routes is not matter */}
        <Route element={<Home/>} path=""/>
        <Route element={<Home/>} path="/home"/>

        {props.userIsAuthorized && <Route element={<ProfileContainer/>} path="/profile"/>}

        <Route element={<ProfileContainer/>} path="/profile/:profileId"/>
        <Route element={<Settings/>} path="/settings"/>

        {props.userIsAuthorized && <Route element={<MessagesContainer/>} path="/messages/*"/>}

        <Route element={<FindProfilesContainer/>} path="/find-profiles"/>

        <Route element={<RegisterUserContainer/>} path="/register"/>
        <Route element={<LoginUserContainer/>} path="/login"/>
        <Route element={<LogoutUserContainer/>} path="/logout"/>
        <Route element={<Page404/>} path="*"/>
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userIsAuthorized: state.ownProfile.data.profile.user.isAuthorized
})

const MainContentContainer = connect(mapStateToProps, {})(MainContent)
export default MainContentContainer
