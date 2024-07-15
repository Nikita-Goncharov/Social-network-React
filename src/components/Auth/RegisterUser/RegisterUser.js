import styles from "./RegisterUser.module.css"

function RegisterUser(props) {
  const {username, email, password1, password2} = props
  const updateInputValuesCallback = (e) => {
    let newUsername = e.target.name === "username" ? e.target.value : username
    let newEmail = e.target.name === "email" ? e.target.value : email
    let newPassword1 = e.target.name === "password1" ? e.target.value : password1
    let newPassword2 = e.target.name === "password2" ? e.target.value : password2

    props.setNewUserData(newUsername, newEmail, newPassword1, newPassword2)
  }

  return <>
    <div className={styles.register_form}>
      <h1>Register</h1>
      <input onChange={updateInputValuesCallback} value={username} type="text" name="username"
             placeholder="Username"/>
      <input onChange={updateInputValuesCallback} value={email} type="text" name="email" placeholder="Email"/>
      <input onChange={updateInputValuesCallback} value={password1} type="password" name="password1"
             placeholder="Password 1"/>
      <input onChange={updateInputValuesCallback} value={password2} type="password" name="password2"
             placeholder="Password 2"/>
      <button disabled={props.loading && true} onClick={() => props.createNewUserThunk(username, email, password1, password2)}>Register</button>
      {props.error && <p style={{backgroundColor: "red", color: "#fff"}}>{props.error.message}</p>}
    </div>
  </>
}

export default RegisterUser