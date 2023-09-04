import { get, ref, update } from "firebase/database"
import { database, storage } from "../../services/firebase"
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage"
// @ts-ignore
import { v4 as uuidv4 } from "uuid"

let initialState = {
  userTweets: [],
  allTweets: [],
  loadingNewTweet: false,
}

type TNewTweet = {
  postId: string
  title: string
  images: []
  likes: number
}

const ADD_NEW_TWEET = "ADD_NEW_TWEET"
const SET_USER_TWEETS = "SET_USER_TWEETS"
const SET_NEW_TWEET_LOADING = "SET_NEW_TWEET_LOADING"

const tweetsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_NEW_TWEET: {
      return {
        ...state,
        userTweets: [...state.userTweets, action.payload],
      }
    }
    case SET_USER_TWEETS: {
      return {
        ...state,
        userTweets: [...state.userTweets, action.payload],
      }
    }
    case SET_NEW_TWEET_LOADING: {
      return {
        ...state,
        loadingNewTweet: action.payload,
      }
    }

    default: {
      return state
    }
  }
}

type TAddNewTweet = {
  payload: any
  type: typeof ADD_NEW_TWEET
}

export const addNewTweet = (payload: TNewTweet): TAddNewTweet => ({
  payload,
  type: ADD_NEW_TWEET,
})

type TSetLoadingNewTweet = {
  payload: boolean
  type: typeof SET_NEW_TWEET_LOADING
}

export const setLoadingNewTweet = (payload: boolean): TSetLoadingNewTweet => ({
  payload,
  type: SET_NEW_TWEET_LOADING,
})

type TSetUserTweets = {
  payload: boolean
  type: typeof SET_USER_TWEETS
}

export const setUserTweets = (payload: any): TSetUserTweets => ({
  payload,
  type: SET_USER_TWEETS,
})

export const addNewTweetThunk = (data: TNewTweet) => async (dispatch: any) => {
  try {
    dispatch(setLoadingNewTweet(true))
    const tweetImages = data.images
    // @ts-ignore
    const { userUID }: string = JSON.parse(localStorage.getItem("FB_auth"))
    const userRef = ref(database, `records/users/${userUID}`)
    const user = await get(userRef).then((snapshot: any) => {
      return snapshot.val()
    })
    const tweetUID = `tweet-${uuidv4()}`
    let downloadedImages: any = []
    for (let i = 0; i < tweetImages.length; i++) {
      const tweetImagesRef = storageRef(
        storage,
        `images/${userUID}/${tweetUID}/image-${uuidv4()}`
      )
      await uploadBytes(tweetImagesRef, tweetImages[i])
      const imageUrl = (await getDownloadURL(tweetImagesRef)).toString()
      downloadedImages.push(imageUrl)
    }
    const body: any = {
      title: data.title,
      postId: tweetUID,
      images: downloadedImages,
      likes: 0,
    }
    const usersTweets: any = []
    const readyTweets: any = {}
    const updatedUser: any = {
      ...user,
      posts: readyTweets,
    }
    Object.values(user.posts).map((post) => usersTweets.push(post))
    usersTweets.push(body)
    for (let i = 0; i < usersTweets.length; ++i) {
      readyTweets[i] = usersTweets[i]
    }
    update(userRef, updatedUser)
    dispatch(addNewTweet(usersTweets))
  } catch (error) {
    console.log(error)
  } finally {
    dispatch(setLoadingNewTweet(false))
  }
}

export default tweetsReducer
