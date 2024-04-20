function RegisterUser(props) {

  const registerUserCallback = (e) => {
    console.log(e.target)
    let username;
    let email;
    let password;
    props.registerUser(username, email, password)
  }

  const updateUsernameCallback = () => {}
  const updateEmailCallback = () => {}
  const updatePasswordCallback = () => {}


  return <>
    <form onSubmit={registerUserCallback}>
      <input type="text" name="username" placeholder="Username"/>
      <input type="text" name="email" placeholder="Email"/>
      <input type="password" name="password" placeholder="Password"/>
      <button type="submit">Register</button>
    </form>
  </>
}

export default RegisterUser