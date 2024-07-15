import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import findProfilesReducer from "./findProfilesReducer";
import ownProfileReducer from "./ownProfileReducer"
import createNewUserReducer from "./createNewUserReducer"
import {thunk as thunkMiddleware} from "redux-thunk";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messagesReducer,
  findProfiles: findProfilesReducer,
  ownProfile: ownProfileReducer,
  createNewUser: createNewUserReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store