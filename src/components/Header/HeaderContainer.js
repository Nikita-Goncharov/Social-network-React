import {connect} from "react-redux";

import Header from "./Header";

const mapStateToProps = (state) => ({
  isAuthorized: state.ownProfile.profile.user.isAuthorized
})

export default connect(mapStateToProps, {})(Header)