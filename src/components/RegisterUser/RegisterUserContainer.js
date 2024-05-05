import RegisterUser from "./RegisterUser";
import {connect} from "react-redux";
import {setNewUserDataAC} from "../../redux/createUserReducer";

function RegisterUserContainerAPI(props) {
  const registerUserCallback = async () => {

    let username = props.username;
    let email = props.email;
    let password1 = props.password1;
    let password2 = props.password2;
    if (password1 === password2) {
      let responseRegister = await fetch(
        "http://localhost:8080/api/v0.2/register",
        {method: "POST", body: JSON.stringify({username: username, email: email, password: password1})}
      )

      if (responseRegister.status !== 200) {
        console.log("Register user error")
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
  username: state.createUser.username,
  email: state.createUser.email,
  password1: state.createUser.password1,
  password2: state.createUser.password2
})

const mapDispatchToProps = (dispatch) => ({
  setNewUserData: (username, email, password1, password2) => dispatch(setNewUserDataAC(username, email, password1, password2))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserContainerAPI)