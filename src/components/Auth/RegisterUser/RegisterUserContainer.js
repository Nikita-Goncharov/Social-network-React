import RegisterUser from "./RegisterUser";
import {connect} from "react-redux";
import {createNewUserThunkCreator, setNewUserDataAC} from "../../../redux/createNewUserReducer";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function RegisterUserContainerAPI(props) {
  // const nav = useNavigate()
  return <RegisterUser
    loading={props.loading}
    error={props.error}
    username={props.username}
    email={props.email}
    password1={props.password1}
    password2={props.password2}
    setNewUserData={props.setNewUserData}
    createNewUserThunk={props.createNewUserThunk}
  />
}


const mapStateToProps = (state) => ({
  username: state.createNewUser.inputData.username,
  email: state.createNewUser.inputData.email,
  password1: state.createNewUser.inputData.password1,
  password2: state.createNewUser.inputData.password2,
  loading: state.createNewUser.loading,
  error: state.createNewUser.error
})

const mapDispatchToProps = (dispatch) => ({
  setNewUserData: (username, email, password1, password2) => dispatch(setNewUserDataAC(username, email, password1, password2)),
  createNewUserThunk: (username, email, password1, password2) => dispatch(createNewUserThunkCreator(username, email, password1, password2))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserContainerAPI)