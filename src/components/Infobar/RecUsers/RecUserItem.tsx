import React, { FC } from "react"
import s from "../Infobar.module.scss"

type TRecUserItem = {
  avatar: string
  login: string
  username: string
}

const RecUserItem: FC<TRecUserItem> = ({ avatar, login, username }) => {
  return (
    <div className={s.userItem}>
      <div className={s.userContainer}>
        <div className={s.userInfoAvatarImage}>
          <img
            src={avatar?.length > 1 ? avatar : "img/common/main-logo.svg"}
            alt="user avatar"
            style={
              avatar?.length === 0
                ? {
                    width: "40px",
                    height: "40px",
                    borderRadius: "0",
                  }
                : {
                    width: "40px",
                    height: "40px",
                  }
            }
          />
        </div>
        <div className={s.userItemInfo}>
          <span className={s.userName}>{username}</span>
          <span className={s.userLogin}>@{login}</span>
        </div>
      </div>
      <button className={s.followButton}>Follow</button>
    </div>
  )
}

export default RecUserItem
