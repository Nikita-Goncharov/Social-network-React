import {imgPath} from "../../../redux/profileReducer";

const AnonProfileImg = ({imgPath, width}) => {
    return (
      <img src={imgPath} width={width} alt="ProfileItem default img"/>
    )
}

AnonProfileImg.defaultProps = {
  imgPath,
  width: 300
}

export default AnonProfileImg