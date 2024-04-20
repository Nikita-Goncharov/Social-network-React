import styles from "./UserItem.module.css"
import {NavLink} from "react-router-dom";
function User(props) {
  return (
      <>
        <NavLink to={"/profile/" + props.user.id}>
            <div className={styles.user_img}>
              <img src={props.user.img} width="300" alt=""/>
            </div>

            <div className={styles.user_data}>
              <div>
                <h3>{props.user.username}</h3>
                <p>{props.user.status}</p>
              </div>
              <div>
                <h3>{props.user.country}</h3>
                <h4>{props.user.city}</h4>
              </div>
            </div>
        </NavLink>
        <div>
          <button onClick={() => props.followUser(props.user.id)}>
            {props.user.followed ? "Unfollow" : "Follow"}
          </button>
        </div>
      </>
  )
}

export default User