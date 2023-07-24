import React, { FC } from "react"
import s from "../Navbar.module.scss"
type TUser = {
  image?: string
}

const User: FC<TUser> = ({ image }) => {
  return (
    <div className={s.navbarBottom}>
      <img src={image ? image : "img/default-avatar.svg"} alt="user photo" />
      <div className={s.navbarUserInfo}>
        <span className={s.userName}>Meliond</span>
        <span className={s.userLogin}>@meliond</span>
      </div>
      <div className={s.navbarMoreInfo}>
        <img src="img/infobar/trendslist-icon.svg" alt="more info" />
      </div>
    </div>
  )
}

export default User
