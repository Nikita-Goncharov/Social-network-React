import React from "react"
import {connect} from "react-redux";
import axios from "axios";

import Users from "./Users";
import {
  followUserActionCreator,
  setUsersAC,
  pagesCountAC,
  totalUsersAC,
  currentPageAC,
  fetchingAC
} from "../../redux/findUsersReducer";


class UsersAPIContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
  }

  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.fetching(true)
      axios.get(
          `http://localhost:8080/api/v0.2/profiles?page=${this.props.currentPage}&count=${this.props.countUsersOnPage}`
      ).then(response => {
        if (response.status === 200) {
          // console.log(response.data)
          this.props.setUsers(response.data.profiles)
          this.props.setTotalUsersCount(response.data.total_count)
          this.props.setPagesCount(Math.ceil(response.data.total_count / this.props.countUsersOnPage))
          this.props.fetching(false)
        } else {
          console.log("Error response")
        }
      })
    }
  }

  changeCurrentPage(currentPage) {
    this.props.setCurrentPage(currentPage)
    this.props.fetching(true)
    axios.get(
        `http://localhost:8080/api/v0.2/profiles?page=${currentPage}&count=${this.props.countUsersOnPage}`
    ).then(response => {
      if (response.status === 200) {
        this.props.setUsers(response.data.profiles)
        this.props.fetching(false)
      } else {
        console.log("Error response")
      }
    })
  }

  render() {
    return (
        <Users
            changeCurrentPage={this.changeCurrentPage}
            currentPage={this.props.currentPage}
            pagesCount={this.props.pagesCount}
            users={this.props.users}
            followUser={this.props.followUser}
            isFetching={this.props.isFetching}
        />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.findUsers.users,
    pagesCount: state.findUsers.pagesCount,
    currentPage: state.findUsers.currentPage,
    totalUsers: state.findUsers.totalUsers,
    countUsersOnPage: state.findUsers.countUsersOnPage,
    isFetching: state.findUsers.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    followUser: user_id => dispatch(followUserActionCreator(user_id)),
    setUsers: users => dispatch(setUsersAC(users)),
    setPagesCount: count => dispatch(pagesCountAC(count)),
    setTotalUsersCount: count => dispatch(totalUsersAC(count)),
    setCurrentPage: currentPage => dispatch(currentPageAC(currentPage)),
    fetching: isFetching => dispatch(fetchingAC(isFetching))
  }
}


const FindUsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer)

export default FindUsersContainer