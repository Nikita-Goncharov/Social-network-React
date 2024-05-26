import {connect} from "react-redux";

function RenderIfAuthorizedComponent(props) {
  if (props.isAuthorized) {
    return props.render
  } else {
    return props.elseRender
  }
}


const mapStateToProps = (state, ownProps) => ({
  isAuthorized: state.ownProfile.profile.user.isAuthorized,
  render: ownProps.render,
  elseRender: ownProps.elseRender || <></>
})

export const RenderIfAuthorized = connect(mapStateToProps, {})(RenderIfAuthorizedComponent)