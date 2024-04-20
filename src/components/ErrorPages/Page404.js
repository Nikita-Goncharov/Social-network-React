import {NavLink} from "react-router-dom";

const Page404 = () => {
  return (
      <div>
        <h2>Page not found(404)</h2>
        <NavLink to='/'>Return to home page</NavLink>
      </div>
  )
}

export default Page404