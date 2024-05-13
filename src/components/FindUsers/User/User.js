import styles from "./UserItem.module.css"
import {NavLink} from "react-router-dom"
import AnonUserImg from "../../AnonUserImg/AnonUserImg"

function User(props) {
  return (
      <>
        <NavLink to={"/profile/" + props.profile.id}>
            <div className={styles.user_img}>
              {
                props.profile.img ?
                  <img src={props.profile.img} width="300" alt=""/>
                  :
                  <AnonUserImg />
              }
            </div>

          <div className={styles.user_data}>
              <div>
                <h3>{props.profile.user.username}</h3>
                <p>{props.profile.status}</p>
              </div>
              <div>
                <h3>{props.profile.country}</h3>
                <h4>{props.profile.city}</h4>
              </div>
            </div>
        </NavLink>
        <div>
          <button onClick={() => props.followUser(props.profile.id)}>
            {props.profile.followed ? "Unfollow" : "Follow"}
          </button>
        </div>
      </>
  )
}

export default User