import data from "@emoji-mart/data"
import React, { FC, useState, useEffect, useRef, lazy, Suspense } from "react"
import s from "./NewTweet.module.scss"
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea"
import Loader from "../../../components/Loader/Loader"

const EmojiPicker = lazy(() => import("@emoji-mart/react"))

const NewTweet: FC = () => {
  const [tweetValue, setTweetValue] = useState<string>("")
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const textArea = useRef<HTMLTextAreaElement>(null)
  const emojiDiv = useRef<HTMLDivElement>(null)
  const emojiButton = useRef<HTMLImageElement>(null)
  useAutosizeTextArea(textArea.current, tweetValue)

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

  return (
    <div className={s.tweet}>
      <div className={s.tweetUser}>
        <img
          src="http://zbs-sticker.by/stories/images/prod/3862x0ccc-300x220.png"
          alt=""
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
        <div className={s.tweetOptions}>
          <div className={s.optionsTools}>
            <img src="img/tweetArea/image.svg" className={s.optionsItem} />
            <img
              ref={emojiButton}
              src="img/tweetArea/smile.svg"
              className={s.optionsItem}
              onClick={onShowEmoji}
            />
          </div>
          <button className={s.tweetButton}>Tweet</button>
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
