import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import findProfilesReducer from "./findProfilesReducer";
import ownProfileReducer from "./ownProfileReducer"
import createNewUserReducer from "./createNewUserReducer"

const reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messagesReducer,
  findProfiles: findProfilesReducer,
  ownProfile: ownProfileReducer,
  createNewUser: createNewUserReducer
})

let store = createStore(reducers)

export default store