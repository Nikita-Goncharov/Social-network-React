import React from "react"
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


class FindProfilesAPIContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
  }

  componentDidMount() {
    if (this.props.profiles.length === 0) {
      this.props.fetching(true)
      fetch(
        `http://localhost:8080/api/v0.2/profiles?page=${this.props.currentPage}&count=${this.props.countProfilesOnPage}`
      ).then(
        response => response.json()
      ).then(responseJSON => {
        this.props.setProfiles(responseJSON.profiles)
        this.props.setTotalProfilesCount(responseJSON.total_count)
        this.props.setPagesCount(Math.ceil(responseJSON.total_count / this.props.countProfilesOnPage))
        this.props.fetching(false)
      }).catch(err => console.log("Error occurred!"))
    }
  }

  changeCurrentPage(currentPage) {
    this.props.setCurrentPage(currentPage)
    this.props.fetching(true)
    fetch(
      `http://localhost:8080/api/v0.2/profiles?page=${currentPage}&count=${this.props.countProfilesOnPage}`
    ).then(
      response => response.json()
    ).then(responseJSON => {
      this.props.setProfiles(responseJSON.profiles)
      this.props.fetching(false)
    }).catch(err => console.log("Error occurred!"))  // TODO: show error
  }

  render() {
    return (
        <Profiles
            changeCurrentPage={this.changeCurrentPage}
            currentPage={this.props.currentPage}
            pagesCount={this.props.pagesCount}
            profiles={this.props.profiles}
            follow={this.props.follow}
            isFetching={this.props.isFetching}
        />
    )
  }
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