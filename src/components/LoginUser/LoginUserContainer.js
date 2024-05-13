import LoginUser from "./LoginUser";
import {connect} from "react-redux";
import {setCurrentLoginInputValuesAC, loginUserAC} from "../../redux/ownUserReducer";
import {useCookies} from "react-cookie";


function LoginUserContainer(props) {
  const [cookies, setCookie] = useCookies()
  const loginUserAPICall = async () => {
    let responseLogin = await fetch(
      "http://localhost:8080/api/v0.2/login",
      {method: "POST", body: JSON.stringify({email: props.email, password: props.password})}
    )

    if (responseLogin.status === 200) {
      let responseLoginBody = await responseLogin.json()
      setCookie("Authorization", responseLoginBody.token)
      let responseWhoAmI = await fetch(
        "http://localhost:8080/api/v0.2/whoami",
        {headers: {"Authorization": responseLoginBody.token}}
      )
      if (responseWhoAmI.status === 200) {
        let responseWhoAmIBody = await responseWhoAmI.json()
        const user_data = {
          user_id: responseWhoAmIBody.profile.user.id,
          username: responseWhoAmIBody.profile.user.username,
          email: responseWhoAmIBody.profile.user.email,
          token: responseWhoAmIBody.profile.user.token
        }
        const profile_data = {
          profile_id: responseWhoAmIBody.profile.id,
          img: responseWhoAmIBody.profile.img,
          status: responseWhoAmIBody.profile.status,
          education: responseWhoAmIBody.profile.education,
          web_site: responseWhoAmIBody.profile.web_site,
          country: responseWhoAmIBody.profile.country,
          city: responseWhoAmIBody.profile.city,
          birth_date: responseWhoAmIBody.profile.birth_date
        }
        props.loginUser(user_data, profile_data)
      } else {
        // TODO: show error
      }
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
  loginUser: (user_data, profile_data) => dispatch(loginUserAC(user_data, profile_data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUserContainer)