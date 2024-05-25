import LoginUser from "./LoginUser";
import {connect} from "react-redux";
import {setCurrentLoginInputValuesAC, loginAC} from "../../../redux/ownProfileReducer";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function LoginUserContainer(props) {
  const nav = useNavigate()
  const [cookies, setCookie] = useCookies()
  const [error, setError] = useState({isRaised: false, message: ""})
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
        const responseWhoAmIBody = await responseWhoAmI.json()
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
        nav("/profile")
      } else {
        setError({isRaised: true, message: "Error. Can`t login user, credentials is not valid."})
      }
    } else {
      setError({isRaised: true, message: "Error. Can`t login user, credentials is not valid."})
    }
    props.updateInputValues("", "")
  }

  return <LoginUser error={error} email={props.email} password={props.password} updateInputValues={props.updateInputValues} loginUserAPICall={loginUserAPICall}/>
}


const mapStateToProps = (state) => ({
  email: state.ownProfile.currentInputValues.email,
  password: state.ownProfile.currentInputValues.password,

})

const mapDispatchToProps = (dispatch) => ({
  updateInputValues: (email, password) => dispatch(setCurrentLoginInputValuesAC(email, password)),
  loginUser: (user_data, profile_data) => dispatch(loginAC(user_data, profile_data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUserContainer)