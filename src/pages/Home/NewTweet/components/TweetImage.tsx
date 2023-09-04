import React, { FC } from "react"
import s from "../NewTweet.module.scss"

type TTweetImage = {
  src: string
  deleteTweetImage: (src: string) => void
}

const TweetImage: FC<TTweetImage> = ({ src, deleteTweetImage }) => {
  return (
    <div className={s.tweetImages} onClick={() => deleteTweetImage(src)}>
      <img src={src} alt="Please choose another image" />
    </div>
  )
}

export default TweetImage
