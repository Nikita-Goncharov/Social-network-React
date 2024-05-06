import {connect} from "react-redux";

import Header from "./Header";

const mapStateToProps = (state) => ({
  isAuthorized: state.ownUser.profile.user.isAuthorized
})

export default connect(mapStateToProps, {})(Header)