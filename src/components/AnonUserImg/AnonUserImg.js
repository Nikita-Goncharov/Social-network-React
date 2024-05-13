import {imgPath} from "../../redux/profileReducer";

const AnonUserImg = ({imgPath, width}) => {
    return (
      <img src={imgPath} width={width} alt="User default img"/>
    )
}

AnonUserImg.defaultProps = {
  imgPath,
  width: 300
}

export default AnonUserImg