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
    <div className={styles.login_form}>
      <input onChange={updateInputValuesCallback} type="text" name="email" placeholder="Email" value={props.email}/>
      <input onChange={updateInputValuesCallback} type="password" name="password" placeholder="Password"
             value={props.password}/>
      <button onClick={props.loginUserAPICall}>Login</button>
    </div>
  </>
}

export default LoginUser