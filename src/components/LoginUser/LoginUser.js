import styles from "./LoginUser.module.css"

function LoginUser(props) {

  const updateInputValuesCallback = (e) => {
    if (e.target.name === "email") {
      props.updateInputValues(e.target.value, props.password)
    } else if (e.target.name === "password") {
      props.updateInputValues(props.email, e.target.value)
    }
  }

  return <>
    <form className={styles.login_form} onSubmit={props.loginUserAPICall}>
      <input onChange={updateInputValuesCallback} type="text" name="email" placeholder="Email" value={props.email}/>
      <input onChange={updateInputValuesCallback} type="password" name="password" placeholder="Password"
             value={props.password}/>
      <button type="submit">Login</button>
    </form>
  </>
}

export default LoginUser