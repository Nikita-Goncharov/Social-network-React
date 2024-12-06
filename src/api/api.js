import {useCookies} from "react-cookie";

const headersWithAuthTokens = (headers={}) => {
  const [cookies, setCookie] = useCookies()
  headers["Authorization"] = cookies["Authorization"]
  return headers
}


const userAPI = {

}

const profileAPI = {

}

const messageAPI = {

}