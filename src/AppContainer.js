import App from "./App";
import {useCookies} from "react-cookie";
import {connect} from "react-redux";
import {useEffect} from "react";
import {getUserDataThunkCreator} from "./redux/ownProfileReducer";


// App container for check if in cookies exists user token and if exists, then load his data
function AppContainerLoginUser(props) {
  const [cookies, setCookie] = useCookies()
  useEffect(() => {
    if (cookies.hasOwnProperty("Authorization")) {
      props.getUserData(cookies.Authorization)
    }
  }, [])
  return <App/>
}

const mapDispatchToProps = (dispatch) => ({
  getUserData: (token) => dispatch(getUserDataThunkCreator(token))
})

export default connect(null, mapDispatchToProps)(AppContainerLoginUser)
