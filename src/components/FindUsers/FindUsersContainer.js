import {connect} from "react-redux";
import FindUsers from "./FindUsers"
import {followUserActionCreator, setUsersAC} from "../../redux/findUsersReducer";


const mapStateToProps = (state) => {
  return {
    users: state.findUsers.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    followUser: user_id => dispatch(followUserActionCreator(user_id)),
    setUsers: users => dispatch(setUsersAC(users))
  }
}


const FindUsersContainer = connect(mapStateToProps, mapDispatchToProps)(FindUsers)

export default FindUsersContainer