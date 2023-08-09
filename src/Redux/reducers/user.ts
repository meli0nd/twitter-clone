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
  password: string | null
  confirm_password: string | null
  banner: string | null
  bio: string | null
  location: string | null
  website: string | null
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
}

type TInitialState = typeof initialState

const SET_USER = "SET_USER"
const SIGN_OUT = "SIGN_OUT"
const UPDATE_USER_POP_UP = "UPDATE_USER_POP_UP"

const userReducer = (state = initialState, action: any): TInitialState => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      }
    }
    case SIGN_OUT: {
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
          avatar: action.payload.avatar,
          banner: action.payload.banner,
          name: action.payload.name,
          bio: action.payload.bio,
          website: action.payload.website,
          location: action.payload.website,
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

export const signOutAction = (): TSignOutAction => ({
  type: SIGN_OUT,
})

export default userReducer
