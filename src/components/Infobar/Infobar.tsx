import React, { FC } from "react"
import s from "./Infobar.module.scss"
import Trends from "./Trends/Trends"
import RecUsers from "./RecUsers/RecUsers"

const Infobar: FC = () => {
  return (
    <div className={s.infobar}>
      <div className={s.infobarSearch}>
        <img src="img/infobar/infobar-search.svg" alt="search" />
        <input type="search" placeholder="Search Tweety" />
      </div>
      <Trends />
      <RecUsers />
    </div>
  )
}

export default Infobar
