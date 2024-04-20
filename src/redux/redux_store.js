import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import findUsersReducer from "./findUsersReducer";
import ownUserReducer from "./ownUserReducer"
import createUserReducer from "./createUserReducer"

let reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messagesReducer,
  findUsers: findUsersReducer,
  ownUser: ownUserReducer,
  createUser: createUserReducer
})

let store = createStore(reducers)

export default store