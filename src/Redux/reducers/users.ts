import { get, ref } from "firebase/database"
import { TUser } from "./user-profile"
import { database } from "../../services/firebase"

let initialState = {
  users: null,
  usersLogin: [] as string[],
  usersEmail: [] as string[],
  isLoadingUsers: false,
}

const GET_ALL_USERS = "GET_ALL_USERS"
const GET_ALL_USERS_LOGIN = "GET_ALL_USERS_LOGIN"
const GET_ALL_USERS_EMAIL = "GET_ALL_USERS_EMAIL"
const SET_ALL_USERS_LOADING = "SET_ALL_USERS_LOADING"
const SET_ALL_USERS = "SET_ALL_USERS"

const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_USERS: {
      return { ...state, users: action.payload }
    }
    case GET_ALL_USERS_LOGIN: {
      return { ...state, usersLogin: action.payload }
    }
    case GET_ALL_USERS_EMAIL: {
      return { ...state, usersEmail: action.payload }
    }
    case SET_ALL_USERS_LOADING: {
      return { ...state, isLoadingUsers: action.payload }
    }
    case SET_ALL_USERS: {
      return { ...state, users: action.payload }
    }
    default: {
      return state
    }
  }
}

type TGetAllUsersLogin = {
  type: typeof GET_ALL_USERS_LOGIN
  payload: string[]
}

export const getAllUsersLogin = (payload: string[]): TGetAllUsersLogin => ({
  type: GET_ALL_USERS_LOGIN,
  payload,
})

type TGetAllUsersEmail = {
  type: typeof GET_ALL_USERS_EMAIL
  payload: string[]
}

export const getAllUsersEmail = (payload: string[]): TGetAllUsersEmail => ({
  type: GET_ALL_USERS_EMAIL,
  payload,
})

type TSetAllUsersLoading = {
  type: typeof SET_ALL_USERS_LOADING
  payload: boolean
}

export const setAllUsersLoading = (payload: boolean): TSetAllUsersLoading => ({
  type: SET_ALL_USERS_LOADING,
  payload,
})

type TSetAllUsers = {
  type: typeof SET_ALL_USERS
  payload: TUser[]
}

export const setAllUsers = (payload: TUser[]): TSetAllUsers => ({
  type: SET_ALL_USERS,
  payload,
})

export const getAllUsersLoginThunk = () => async (dispatch: any) => {
  try {
    const usersRef = ref(database, "/records/users/")
    const users = await get(usersRef).then((snapshot) => {
      return snapshot.val()
    })
    if (users) {
      const usersLogin = Object.values(users).map((item: any) => item.login)
      const usersEmail = Object.values(users).map((item: any) => item.email)
      dispatch(getAllUsersLogin(usersLogin))
      dispatch(getAllUsersEmail(usersEmail))
    }
  } catch (error) {
    console.log(error)
  }
}

export const getAllUsersThunk = () => async (dispatch: any) => {
  try {
    dispatch(setAllUsersLoading(true))
    const usersRef = ref(database, "/records/users/")
    const allUsers = await get(usersRef).then((snapshot) => {
      return snapshot.val()
    })
    dispatch(setAllUsers(allUsers))
  } catch (error) {
    console.log(error)
  } finally {
    dispatch(setAllUsersLoading(false))
  }
}

export default usersReducer
