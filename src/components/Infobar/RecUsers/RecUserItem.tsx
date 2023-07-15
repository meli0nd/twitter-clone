import React, { FC } from "react"
import s from "../Infobar.module.scss"

const RecUserItem: FC = () => {
  return (
    <div className={s.userItem}>
      <div className={s.userContainer}>
        <img
          src="http://zbs-sticker.by/stories/images/prod/3862x0ccc-300x220.png"
          alt="user photo"
        />
        <div className={s.userItemInfo}>
          <span className={s.userName}>Meliond</span>
          <span className={s.userLogin}>@meliond</span>
        </div>
      </div>
      <button className={s.followButton}>Follow</button>
    </div>
  )
}

export default RecUserItem