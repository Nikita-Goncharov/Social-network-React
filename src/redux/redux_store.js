import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import findUsersReducer from "./findUsersReducer";


let reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messagesReducer,
  findUsers: findUsersReducer

})

let store = createStore(reducers)

window.store = store

export default store