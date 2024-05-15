import RegisterUser from "./RegisterUser";
import {connect} from "react-redux";
import {setNewUserDataAC} from "../../../redux/createNewUserReducer";
import {useNavigate} from "react-router-dom";

function RegisterUserContainerAPI(props) {
  const nav = useNavigate()
  const registerUserCallback = async () => {
    const {username, email, password1, password2} = props;
    if (password1 === password2) {
      let responseRegister = await fetch(
        "http://localhost:8080/api/v0.2/register",
        {method: "POST", body: JSON.stringify({username: username, email: email, password: password1})}
      )

      if (responseRegister.status === 200) {
        nav("/login")
      } else {
        console.log("RegisterUser user error")  // TODO: show form error
      }
    }
  }

  return <RegisterUser
    username={props.username}
    email={props.email}
    password1={props.password1}
    password2={props.password2}
    setNewUserData={props.setNewUserData}
    registerUserCallback={registerUserCallback}
  />
}


const mapStateToProps = (state) => ({
  username: state.createNewUser.newUser.username,
  email: state.createNewUser.newUser.email,
  password1: state.createNewUser.newUser.password1,
  password2: state.createNewUser.newUser.password2
})

const mapDispatchToProps = (dispatch) => ({
  setNewUserData: (username, email, password1, password2) => dispatch(setNewUserDataAC(username, email, password1, password2))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserContainerAPI)