import { ref, get, update } from "firebase/database"
import { database, storage } from "../../services/firebase"
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage"
import { setUserTweets } from "./tweets"

export type TUserBirthDate = {
  year: number
  month: string
  day: number
}

export type TUser = {
  avatar: string | null
  name: string | null
  login: string | null
  email: string | null
  userBirthDate: TUserBirthDate | null
  banner: string | null
  bio: string | null
  location: string | null
  website: string | null
  posts: []
  following: []
  bookmarks: []
  userId: string
}

export type TUserUpdatePopUp = {
  avatar: string | null
  name: string | null
  banner: string | null
  bio: string | null
  location: string | null
  website: string | null
}

let initialState = {
  user: null as TUser | null,
  isAuth: false,
  profileLoading: false,
}

type TInitialState = typeof initialState

const SET_USER = "SET_USER"
const UPDATE_USER_POP_UP = "UPDATE_USER_POP_UP"
const SET_PROFILE_LOADING = "SET_PROFILE_LOADING"
const SIGN_OUT = "SIGN_OUT"

const profileReducer = (state = initialState, action: any): TInitialState => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      }
    }
    case SET_PROFILE_LOADING: {
      return {
        ...state,
        profileLoading: action.payload,
      }
    }
    case SIGN_OUT: {
      localStorage.removeItem("FB_auth")
      return {
        ...state,
        user: null,
        isAuth: false,
      }
    }
    case UPDATE_USER_POP_UP: {
      return {
        ...state,
        //@ts-ignore
        user: {
          ...state.user,
          avatar:
            action.payload.avatar !== ""
              ? action.payload.avatar
              : state.user?.avatar,
          banner: action.payload.banner,
          name: action.payload.name,
          bio: action.payload.bio,
          website: action.payload.website,
          location: action.payload.location,
        },
      }
    }
    default: {
      return state
    }
  }
}

type TSetUserAction = {
  type: typeof SET_USER
  payload: TUser
}

export const setUserAction = (payload: TUser): TSetUserAction => ({
  type: SET_USER,
  payload,
})

type TUpdateUserPopUp = {
  type: typeof UPDATE_USER_POP_UP
  payload: TUserUpdatePopUp
}

export const updateUserPopUp = (
  payload: TUserUpdatePopUp
): TUpdateUserPopUp => ({
  type: UPDATE_USER_POP_UP,
  payload,
})

type TSignOutAction = {
  type: typeof SIGN_OUT
}

type TSetProfileLoading = {
  type: typeof SET_PROFILE_LOADING
  payload: boolean
}

export const setProfileLoading = (payload: boolean): TSetProfileLoading => ({
  type: SET_PROFILE_LOADING,
  payload,
})

export const signOutAction = (): TSignOutAction => ({
  type: SIGN_OUT,
})

export const getUserThunk = (userId?: string) => async (dispatch: any) => {
  try {
    dispatch(setProfileLoading(true))
    //@ts-ignore
    const { userUID } = JSON.parse(localStorage.getItem("FB_auth"))
    const userRef = ref(database, `/records/users/${userId ? userId : userUID}`)
    const user = await get(userRef).then((snapshot) => {
      return snapshot.val()
    })
    dispatch(setUserAction(user))
    dispatch(setUserTweets(user.posts))
  } catch (error) {
  } finally {
    dispatch(setProfileLoading(false))
  }
}

export const updateUserThunk = (data: any) => async (dispatch: any) => {
  console.log(data)
  try {
    dispatch(setProfileLoading(true))
    //@ts-ignore
    const { userUID } = JSON.parse(localStorage.getItem("FB_auth"))
    const userRef = ref(database, `/records/users/${userUID}`)
    const { banner, avatar } = data
    let bannerLink = ""
    let avatarLink = ""
    if (banner) {
      const userAvatarRef = storageRef(storage, `images/avatars/${userUID}`)
      const userBannerRef = storageRef(storage, `images/banners/${userUID}`)
      await uploadBytes(userAvatarRef, avatar)
      await uploadBytes(userBannerRef, banner)
      const downloadedAvatar = await getDownloadURL(userAvatarRef)
      const downloadedBanner = await getDownloadURL(userBannerRef)
      bannerLink = downloadedBanner.toString()
      avatarLink = downloadedAvatar.toString()
    } else {
      bannerLink = ""
      avatarLink = ""
    }
    const updatedUser = {
      ...data,
      banner: bannerLink,
      avatar: avatarLink,
    }
    update(userRef, updatedUser)
    dispatch(updateUserPopUp(updatedUser))
  } catch (error) {
  } finally {
    dispatch(setProfileLoading(false))
  }
}

export default profileReducer
