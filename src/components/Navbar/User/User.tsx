import React, { FC } from "react"
import s from "../Navbar.module.scss"
type TUser = {
  name: string | null | undefined
  avatar: string | null | undefined
  login: string | null | undefined
}

const User: FC<TUser> = ({ avatar, name, login }) => {
  return (
    <div className={s.navbarBottom}>
      <div
        style={{
          width: "60px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          borderRadius: "50%",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <img
          src={avatar ? avatar : "img/common/main-logo.svg"}
          alt="user photo"
          style={
            avatar
              ? { width: "50px", height: "50px", borderRadius: "50%" }
              : { width: "30px", height: "30px", borderRadius: "0%" }
          }
        />
      </div>
      <div className={s.navbarUserInfo}>
        <span className={s.userName}>{name || ""}</span>
        <span className={s.userLogin}>@{login || ""}</span>
      </div>
      <div className={s.navbarMoreInfo}>
        <img src="img/common/more-info-icon.svg" alt="more info" />
      </div>
    </div>
  )
}

export default User
