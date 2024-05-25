import React, {useEffect, useState} from "react"
import {connect} from "react-redux";

import Profiles from "./Profiles";
import {
  followProfileAC,
  setProfilesAC,
  pagesCountAC,
  totalProfilesAC,
  currentPageAC,
  fetchingAC
} from "../../redux/findProfilesReducer";


function FindProfilesAPIContainer(props) {
  const [error, setError] = useState({isRaised: false, message: ""})

  useEffect(() => {
    if (props.profiles.length === 0) {
      props.fetching(true)
      fetch(
        `http://localhost:8080/api/v0.2/profiles?page=${props.currentPage}&count=${props.countProfilesOnPage}`
      ).then(
        response => response.json()
      ).then(responseJSON => {
        props.setProfiles(responseJSON.profiles)
        props.setTotalProfilesCount(responseJSON.total_count)
        props.setPagesCount(Math.ceil(responseJSON.total_count / props.countProfilesOnPage))
        props.fetching(false)
      }).catch(err => setError({isRaised: true, message: "Error. Can`t fetch profiles."}))
    }
  }, []);

  function changeCurrentPage(currentPage) {
    props.setCurrentPage(currentPage)
    props.fetching(true)
    fetch(
      `http://localhost:8080/api/v0.2/profiles?page=${currentPage}&count=${props.countProfilesOnPage}`
    ).then(
      response => response.json()
    ).then(responseJSON => {
      props.setProfiles(responseJSON.profiles)
      props.fetching(false)
    }).catch(err => setError({isRaised: true, message: "Error. Can`t fetch profiles."}))
  }


  return <Profiles
          error={error}
          changeCurrentPage={changeCurrentPage}
          currentPage={props.currentPage}
          pagesCount={props.pagesCount}
          profiles={props.profiles}
          follow={props.follow}
          isFetching={props.isFetching}
      />
}


const mapStateToProps = (state) => {
  return {
    profiles: state.findProfiles.profiles,
    pagesCount: state.findProfiles.pagesCount,
    currentPage: state.findProfiles.currentPage,
    totalProfiles: state.findProfiles.totalProfiles,
    countProfilesOnPage: state.findProfiles.countProfilesOnPage,
    isFetching: state.findProfiles.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: profile_id => dispatch(followProfileAC(profile_id)),
    setProfiles: profiles => dispatch(setProfilesAC(profiles)),
    setPagesCount: count => dispatch(pagesCountAC(count)),
    setTotalProfilesCount: count => dispatch(totalProfilesAC(count)),
    setCurrentPage: currentPage => dispatch(currentPageAC(currentPage)),
    fetching: isFetching => dispatch(fetchingAC(isFetching))
  }
}


const FindProfilesContainer = connect(mapStateToProps, mapDispatchToProps)(FindProfilesAPIContainer)

export default FindProfilesContainer