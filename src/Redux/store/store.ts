import authReducer from "./../reducers/auth"
import profileReducer from "../reducers/user-profile"
import usersReducer from "../reducers/users"
import tweetsReducer from "../reducers/tweets"
import { useDispatch } from "react-redux"
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux"
import ThunkMiddleware from "redux-thunk"

let rootReducer = combineReducers({
  profileReducer,
  authReducer,
  usersReducer,
  tweetsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
