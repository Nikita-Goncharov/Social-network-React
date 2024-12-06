import LoginUser from "./LoginUser";
import {connect} from "react-redux";
import {getUserDataThunkCreator, setCurrentLoginInputValuesAC} from "../../../redux/ownProfileReducer";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

function LoginUserContainer(props) {
  const nav = useNavigate()
  const [cookies, setCookie] = useCookies()
  const loginUserAPICall = async () => {
    let responseLogin = await fetch(
      "http://localhost:8080/api/v0.2/login",
      {method: "POST", body: JSON.stringify({email: props.email, password: props.password})}
    )

    if (responseLogin.status === 200) {
      let responseLoginBody = await responseLogin.json()
      setCookie("Authorization", responseLoginBody.token)
      props.getUserData(responseLoginBody.token)
      nav("/profile")

    } else {
      // TODO: error
    }
    props.updateInputValues("", "")
  }

  return <LoginUser email={props.email} password={props.password}  //error={error}
                    updateInputValues={props.updateInputValues} loginUserAPICall={loginUserAPICall}/>
}


const mapStateToProps = (state) => ({
  email: state.ownProfile.inputData.email,
  password: state.ownProfile.inputData.password,

})

const mapDispatchToProps = (dispatch) => ({
  updateInputValues: (email, password) => dispatch(setCurrentLoginInputValuesAC(email, password)),
  getUserData: (token) => dispatch(getUserDataThunkCreator(token))
  // loginUser: (user_data, profile_data) => dispatch(loginAC(user_data, profile_data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUserContainer)
