import data from "@emoji-mart/data"
import React, { FC, useState, useEffect, useRef, lazy, Suspense } from "react"
import s from "./NewTweet.module.scss"
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea"
import TweetImage from "./components/TweetImage"
import { useForm } from "react-hook-form"
import Message from "../../../components/Message/Message"
import { useDispatch } from "react-redux"
import { addNewTweetThunk } from "../../../Redux/reducers/tweets"
import { TUser } from "../../../Redux/reducers/user-profile"
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store/store"

type TNewTweet = {
  user: TUser
}

const EmojiPicker = lazy(() => import("@emoji-mart/react"))

const NewTweet: FC<TNewTweet> = ({ user }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" })
  const { loadingNewTweet, userTweets } = useSelector(
    (s: RootState) => s.tweetsReducer
  )
  const [tweetImages, setTweetImages] = useState<string[]>([])
  const [tooManyImages, setTooManyImages] = useState<boolean | null>(null)
  const [tweetValue, setTweetValue] = useState<string>("")
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const textArea = useRef<HTMLTextAreaElement>(null)
  const emojiDiv = useRef<HTMLDivElement>(null)
  const emojiButton = useRef<HTMLImageElement>(null)
  const dispatch = useDispatch()
  useAutosizeTextArea(textArea.current, tweetValue)
  const updateTweetImages = (object: any) => {
    if (
      object.length > 4 ||
      tweetImages.length >= 4 ||
      object.length + tweetImages.length > 4
    ) {
      setTooManyImages(true)
      setTimeout(() => {
        setTooManyImages(false)
      }, 1950)
    } else {
      setTooManyImages(false)
      let imagesArray: string[] = []
      Object.values(object).map((file: any) => {
        imagesArray.push(URL.createObjectURL(file))
      })
      setTweetImages((prev) => [...prev, ...imagesArray])
    }
  }

  const deleteTweetImage = (src: string) => {
    const newTweetImages: string[] = tweetImages.filter(
      (image) => image !== src
    )
    setTweetImages(newTweetImages)
  }

  const onSubmitTweet = () => {
    if (!tweetValue) {
      return
    } else {
      const tweetImagesValue = getValues()
      const data = {
        title: tweetValue,
        images: [...tweetImagesValue.tweetImages],
        likes: 0,
        comments: [{ muting: "mute for Firebase" }],
      }
      // @ts-ignore
      dispatch(addNewTweetThunk(data))
    }
  }

  const addEmoji = (e: any) => {
    let symbol = e.unified.split("-")
    let codesArray: any = []
    symbol.forEach((el: string) => codesArray.push("0x" + el))
    let emoji = String.fromCodePoint(...codesArray)
    setTweetValue(tweetValue + emoji)
  }

  const onShowEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker)
    textArea.current?.focus()
  }

  const clickOutsideEmoji = (e: any) => {
    if (
      textArea.current &&
      !textArea.current.contains(e.target) &&
      emojiDiv.current &&
      !emojiDiv.current.contains(e.target) &&
      emojiButton.current &&
      !emojiButton.current.contains(e.target)
    ) {
      setShowEmojiPicker(false)
    }
  }

  useEffect(() => {
    document.body.addEventListener("click", clickOutsideEmoji)
    return () => {
      document.body.removeEventListener("click", clickOutsideEmoji)
    }
  }, [])

  useEffect(() => {
    setTweetImages([])
    setTweetValue("")
  }, [userTweets])

  return (
    <div className={s.tweet}>
      <div className={s.imagesError}>
        {tooManyImages && (
          <Message title="You can upload only 4 images" success={true} />
        )}
      </div>
      <div className={s.tweetUser}>
        <img
          src={user?.avatar ? user?.avatar : "img/common/main-logo.svg"}
          alt=""
          style={
            user?.avatar
              ? {
                  borderRadius: "50%",
                }
              : {}
          }
        />
      </div>
      <div className={s.tweetContainer}>
        <div className={s.tweetArea}>
          <textarea
            draggable="false"
            placeholder="What's happening?!"
            ref={textArea}
            value={tweetValue}
            onChange={(e: any) => setTweetValue(e.target.value)}
            style={{
              height: "26px",
            }}
          />
        </div>
        <div className={s.tweetImagesContainer}>
          {tweetImages.length >= 1 &&
            tweetImages.map((image) => {
              return (
                <TweetImage
                  src={image}
                  deleteTweetImage={deleteTweetImage}
                  key={image}
                />
              )
            })}
        </div>
        <div className={s.tweetOptions}>
          <div className={s.optionsTools}>
            <input
              type="file"
              id="tweetImage"
              accept="image/png, image/jpeg"
              multiple
              style={{
                display: "none",
              }}
              maxLength={3}
              {...register("tweetImages", {
                onChange(event: any) {
                  updateTweetImages(event.target.files)
                },
              })}
            />
            <label htmlFor="tweetImage">
              <img src="img/tweetArea/image.svg" className={s.optionsItem} />
            </label>
            <img
              ref={emojiButton}
              src="img/tweetArea/smile.svg"
              className={s.optionsItem}
              onClick={onShowEmoji}
            />
          </div>
          <button
            className={s.tweetButton}
            onClick={onSubmitTweet}
            disabled={loadingNewTweet}
          >
            Tweet
          </button>
        </div>
        {showEmojiPicker && (
          <Suspense fallback={<div></div>}>
            <div className={s.emojiPopUp} ref={emojiDiv}>
              <EmojiPicker
                data={data}
                onEmojiSelect={addEmoji}
                className="emoji-mart"
              />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default NewTweet
