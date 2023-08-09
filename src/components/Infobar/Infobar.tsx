import React, { FC } from "react"
import s from "./Infobar.module.scss"
import Trends from "./Trends/Trends"
import RecUsers from "./RecUsers/RecUsers"
type TInfobar = {
  profileEditPopUp?: boolean
}

const Infobar: FC<TInfobar> = ({ profileEditPopUp }) => {
  return (
    <div className={`${s.infobar} ${profileEditPopUp && s.infobarActive}`}>
      <div className={s.infobarSearch}>
        <img src="img/common/search-icon.svg" alt="search" />
        <input type="search" placeholder="Search Tweety" />
      </div>
      <Trends />
      <RecUsers />
    </div>
  )
}

export default Infobar
