import {useCookies} from "react-cookie";
import {connect} from "react-redux";
import {useEffect} from "react";
import {logoutAC} from "../../../redux/ownProfileReducer";
import {useNavigate} from "react-router-dom";

function LogoutUserRedirect() {
  const nav = useNavigate()
  nav("/login")
  return <></>
}

function LogoutUserAPIContainer(props) {
  const [cookies, setCookie, removeCookie] = useCookies()
  useEffect(() => {
    if (props.isAuthorized) {
      removeCookie("Authorization")
      async function logoutUserAPI() {
        let response = await fetch(
          "http://localhost:8080/api/v0.2/logout",
          {method: "POST", headers: {"Authorization": props.userAuthToken}})
        if (response.status === 200) {
          props.logoutUser()
        } else {
          console.log("ProfileItem was not logout in API")
        }
      }
      logoutUserAPI()
    }
  }, []);
  return <LogoutUserRedirect />
}

const mapStateToProps = (state) => ({
  isAuthorized: state.ownProfile.profile.user.isAuthorized,
  userAuthToken: state.ownProfile.profile.user.token,
  profile: state.ownProfile.profile
})

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutAC())
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutUserAPIContainer)