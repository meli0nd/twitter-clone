import React from "react"
import s from "../Infobar.module.scss"
import RecUserItem from "./RecUserItem"

const RecUsers = () => {
  return (
    <div className={s.infobarItem}>
      <div className={s.infobarItemHeader}>
        <h1>Who to follow</h1>
      </div>
      <RecUserItem />
      <RecUserItem />
      <RecUserItem />
      <a href="#">Show more</a>
    </div>
  )
}

export default RecUsers
