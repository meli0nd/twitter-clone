import React, { FC } from "react"
import s from "../Infobar.module.scss"

const RecUserItem: FC = () => {
  return (
    <div className={s.userItem}>
      <div className={s.userContainer}>
        <img
          src="https://pbs.twimg.com/profile_images/1686411476578222080/UUhdotjk_400x400.jpg"
          alt="user photo"
        />
        <div className={s.userItemInfo}>
          <span className={s.userName}>Meliond23123123</span>
          <span className={s.userLogin}>@melion1232123123d</span>
        </div>
      </div>
      <button className={s.followButton}>Follow</button>
    </div>
  )
}

export default RecUserItem
