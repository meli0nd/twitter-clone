import authReducer from "./../reducers/auth"
import profileReducer from "../reducers/user-profile"
import usersReducer from "../reducers/users"
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
})

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
