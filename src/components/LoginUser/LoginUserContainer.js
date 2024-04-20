import LoginUser from "./LoginUser";
import {connect} from "react-redux";
import {setCurrentLoginInputValuesAC, loginUserAC} from "../../redux/ownUserReducer";

function LoginUserContainer(props) {
  const loginUserAPICall = async () => {
    let response = await fetch(
      "http://localhost:8080/api/v0.2/login",
      {method: "POST", body: JSON.stringify({email: props.email, password: props.password})}
    )

    if (response.status === 200) {
      let responseBody = await response.json()
      props.loginUser(props.email, responseBody.token)
    } else {
      // TODO: show error
    }
    props.updateInputValues("", "")
  }

  return <LoginUser email={props.email} password={props.password} updateInputValues={props.updateInputValues} loginUserAPICall={loginUserAPICall}/>
}


const mapStateToProps = (state) => ({
  email: state.ownUser.currentInputValues.email,
  password: state.ownUser.currentInputValues.password,

})

const mapDispatchToProps = (dispatch) => ({
  updateInputValues: (email, password) => dispatch(setCurrentLoginInputValuesAC(email, password)),
  loginUser: (email, token) => dispatch(loginUserAC(email, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUserContainer)