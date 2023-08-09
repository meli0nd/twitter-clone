import userReducer from "./../reducers/user"
import { useDispatch } from "react-redux"
import { combineReducers, legacy_createStore as createStore } from "redux"

let rootReducer = combineReducers({
  userReducer,
})

export const store = createStore(rootReducer)
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
