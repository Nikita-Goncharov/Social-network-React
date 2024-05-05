import {redirect} from "react-router-dom";
import {useCookies} from "react-cookie";
import {connect} from "react-redux";
import {useEffect} from "react";
import {logoutUserAC} from "../../redux/ownUserReducer";
import {Navigate} from "react-router-dom";

function LogoutUserRedirect() {
  return <Navigate to="/login" />
}

function LogoutUserAPIContainer(props) {
  const [cookies, setCookie, removeCookie] = useCookies()
  useEffect(() => {
    removeCookie("Authorization")
    async function logoutUserAPI() {
      let response = await fetch(
        "http://localhost:8080/api/v0.2/logout",
        {method: "POST", headers: {"Authorization": props.userAuthToken}})
      if (response.status !== 200) {
        console.log("User was not logout in API")
      }
    }
    logoutUserAPI()
    props.logoutUser()
  }, []);
  return <LogoutUserRedirect />
}

const mapStateToProps = (state) => ({
  userAuthToken: state.ownUser.logged_user.token
})

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUserAC())
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutUserAPIContainer)