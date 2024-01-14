import React from "react"
import styles from "./FindUsers.module.css"
import User from "./UserItem/UserItem"
import axios from "axios";

class FindUsers extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
  }

  componentDidMount() {
    if (this.props.users.length === 0) {
      axios.get("http://localhost:8080/api/v0.1/users").then(response => {
        if (response.status === 200) {
          let data = JSON.parse(response.data)
          this.props.setUsers(data.users)
        } else {
          console.log("Error response")
        }
      })
    }
  }

  render() {
    return (
        <>
          <h2 className={styles.page_description}>Users</h2>
          <div className={styles.users_management}>
            <div className={styles.users}>
              <ul>
                {this.props.users.map(user => <li key={user.id}><User user={user} followUser={this.props.followUser}/></li>)}
              </ul>
            </div>
            <div className={styles.show_more}>
              <button>Show more</button>
            </div>
          </div>
        </>
    )
  }
}

export default FindUsers