import App from "./App";
import {useCookies} from "react-cookie";
import {connect} from "react-redux";
import {useEffect} from "react";
import {loginUserAC} from "./redux/ownUserReducer";
// App container for check if in cookies exists user token and if exists, then load his data


function AppContainerLoginUser(props) {
  const [cookies, setCookie] = useCookies()
  useEffect(  () => {
    if (cookies.hasOwnProperty("Authorization")) {
      let userAuthToken = cookies.Authorization
      async function setUserDataIfLogged() {
        let responseWhoAmI = await fetch(
          "http://localhost:8080/api/v0.2/whoami",
          {headers: {"Authorization": userAuthToken}}
        )

        if (responseWhoAmI.status === 200) {
          let responseWhoAmIBody = await responseWhoAmI.json()
          responseWhoAmIBody = responseWhoAmIBody.data
          let user_data = {
            username: responseWhoAmIBody.username,
            email: responseWhoAmIBody.email,
            token: responseWhoAmIBody.token
          }
          let profile_data = {
            img: responseWhoAmIBody.profile.img,
            status: responseWhoAmIBody.profile.status,
            education: responseWhoAmIBody.profile.education,
            web_site: responseWhoAmIBody.profile.web_site,
            country: responseWhoAmIBody.profile.country,
            city: responseWhoAmIBody.profile.city,
            birth_date: responseWhoAmIBody.profile.birth_date
          }
          props.loginUser(user_data, profile_data)
        }
      }
      setUserDataIfLogged()
    }
  }, [])
  return <App />
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user_data, profile_data) => dispatch(loginUserAC(user_data, profile_data))
})

export default connect(null, mapDispatchToProps)(AppContainerLoginUser)