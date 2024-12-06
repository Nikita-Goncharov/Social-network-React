import React, {useEffect} from "react"
import {connect} from "react-redux";

import Profiles from "./Profiles";
import {
  currentPageAC,
  findProfilesThunkCreator,
  followUnfollowProfileThunkCreator
} from "../../redux/findProfilesReducer";


function FindProfilesAPIContainer(props) {
  useEffect(() => {
    props.findProfilesThunk(props.userIsAuthorized, props.token, props.currentPage, props.countProfilesOnPage)
  }, [props.token])

  function changeCurrentPage(currentPage) {
    props.setCurrentPage(currentPage)
    props.findProfilesThunk(props.userIsAuthorized, props.token, currentPage, props.countProfilesOnPage)
  }

  function followUnfollowProfile(profileId, currentFollowingState) {
    props.followUnfollowProfileThunk(props.token, currentFollowingState, profileId)
  }

  return <Profiles
    error={props.error}
    ownProfile={props.ownProfile}
    loading={props.loading}
    changeCurrentPage={changeCurrentPage}
    currentPage={props.currentPage}
    pagesCount={props.pagesCount}
    profiles={props.profiles}
    followUnfollowProfile={followUnfollowProfile}
  />
}


const mapStateToProps = (state) => {
  return {
    profiles: state.findProfiles.data.profiles,
    pagesCount: state.findProfiles.data.pagesCount,
    currentPage: state.findProfiles.data.currentPage,
    totalProfiles: state.findProfiles.data.totalProfiles,
    countProfilesOnPage: state.findProfiles.data.countProfilesOnPage,
    loading: state.findProfiles.loading,
    error: state.findProfiles.error,
    userIsAuthorized: state.ownProfile.data.profile.user.isAuthorized,
    ownProfile: state.ownProfile.data.profile,  // TODO: refactor, create container for ProfileItem
    token: state.ownProfile.data.profile.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findProfilesThunk: (userIsAuthorized, token, currentPage, countProfilesOnPage) => dispatch(findProfilesThunkCreator(userIsAuthorized, token, currentPage, countProfilesOnPage)),
    followUnfollowProfileThunk: (token, currentFollowingState, profileId) => dispatch(followUnfollowProfileThunkCreator(token, currentFollowingState, profileId)),
    setCurrentPage: currentPage => dispatch(currentPageAC(currentPage)),
  }
}


const FindProfilesContainer = connect(mapStateToProps, mapDispatchToProps)(FindProfilesAPIContainer)

export default FindProfilesContainer
