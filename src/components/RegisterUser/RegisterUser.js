import styles from "./RegisterUser.module.css"

function RegisterUser(props) {

  const updateInputValuesCallback = (e) => {
    let username = e.target.name === "username" ? e.target.value : props.username
    let email = e.target.name === "email" ? e.target.value : props.email
    let password1 = e.target.name === "password1" ? e.target.value : props.password1
    let password2 = e.target.name === "password2" ? e.target.value : props.password2

    props.setNewUserData(username, email, password1, password2)
  }

  return <>
    <div className={styles.register_form}>
      <input onChange={updateInputValuesCallback} value={props.username} type="text" name="username" placeholder="Username"/>
      <input onChange={updateInputValuesCallback} value={props.email} type="text" name="email" placeholder="Email"/>
      <input onChange={updateInputValuesCallback} value={props.password1} type="password" name="password1" placeholder="Password 1"/>
      <input onChange={updateInputValuesCallback} value={props.password2} type="password" name="password2" placeholder="Password 2"/>
      <button onClick={props.registerUserCallback}>Register</button>
    </div>
  </>
}

export default RegisterUser