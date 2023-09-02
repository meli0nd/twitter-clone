import { getDatabase, ref, set, get } from "firebase/database"
import { setUserAction } from "./user-profile"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { database, storage } from "../../services/firebase"
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage"

const SET_ERROR = "SET_ERROR"
const SET_CREATING_ACCOUNT_LOADING = "SET_CREATING_ACCOUNT_LOADING"
const SET_REGISTER_SUCCESS = "SET_REGISTER_SUCCESS"
const SET_LOGIN_LOADING = "SET_LOGIN_LOADING"

let initialState = {
  creatingAccountLoading: false,
  error: null,
  registerSuccess: false,
  loginLoading: false,
}

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      }
    }
    case SET_CREATING_ACCOUNT_LOADING: {
      return {
        ...state,
        creatingAccountLoading: action.payload,
      }
    }
    case SET_LOGIN_LOADING: {
      return {
        ...state,
        loginLoading: action.payload,
      }
    }
    case SET_REGISTER_SUCCESS: {
      return {
        ...state,
        registerSuccess: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

type TSetCreatingAccount = {
  type: typeof SET_CREATING_ACCOUNT_LOADING
  payload: boolean
}
export const setCreatingAccount = (payload: boolean): TSetCreatingAccount => ({
  type: SET_CREATING_ACCOUNT_LOADING,
  payload,
})
type TSetLoginLoading = {
  type: typeof SET_LOGIN_LOADING
  payload: boolean
}
export const setLoginLoading = (payload: boolean): TSetLoginLoading => ({
  type: SET_LOGIN_LOADING,
  payload,
})

type TSetError = {
  type: typeof SET_ERROR
  payload: string | null
}
export const setError = (payload: string | null): TSetError => ({
  type: SET_ERROR,
  payload,
})

type TSetRegisterSuccess = {
  type: typeof SET_REGISTER_SUCCESS
  payload: boolean
}
export const setRegisterSuccess = (payload: boolean): TSetRegisterSuccess => ({
  type: SET_REGISTER_SUCCESS,
  payload,
})

export const signUpThunk = (body: any) => async (dispatch: any) => {
  try {
    dispatch(setCreatingAccount(true))
    dispatch(setError(null))
    const { avatar } = body
    let userAvatar: string
    const auth = getAuth()
    const data = await createUserWithEmailAndPassword(
      auth,
      body.email,
      body.password
    )
    const userUID = data.user.uid
    localStorage.setItem("FB_auth", JSON.stringify({ userUID }))
    if (avatar) {
      const userAvatarRef = storageRef(storage, `images/avatars/${userUID}`)
      await uploadBytes(userAvatarRef, avatar)
      const image = await getDownloadURL(userAvatarRef)
      userAvatar = image.toString()
    } else {
      userAvatar = ""
    }
    const userRef = ref(database, `records/users/${userUID}`)
    set(userRef, { ...body, userId: userUID, avatar: userAvatar })
    dispatch(setError(null))
    dispatch(setUserAction({ ...body, avatar: userAvatar, userId: userUID }))
    dispatch(setRegisterSuccess(true))
  } catch (error: any) {
    let message: string = ""
    if (
      error.toString() ===
      "FirebaseError: Firebase: Error (auth/email-already-in-use)."
    ) {
      message = "Email already in use"
    }
    dispatch(setError(message))
  } finally {
    dispatch(setCreatingAccount(false))
  }
}

export const signInThunk = (body: any) => async (dispatch: any) => {
  try {
    dispatch(setLoginLoading(true))
    dispatch(setError(null))
    const auth = getAuth()
    const data = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    )
    const userUID = data.user.uid
    localStorage.setItem("FB_auth", JSON.stringify({ userUID: userUID }))
    //@ts-ignore
    const database = getDatabase()
    const userRef = ref(database, `/records/users/${userUID}`)
    // @ts-ignore
    const user = await get(userRef).then((snapshot: any) => {
      return snapshot.val()
    })
    dispatch(setUserAction(user))
  } catch (error: any) {
    dispatch(setError("Wrong email or password"))
  } finally {
    dispatch(setLoginLoading(false))
  }
}

export default authReducer
