import React from "react"
import s from "../Infobar.module.scss"
import TrendsItem from "./TrendsItem"

const Trends = () => {
  return (
    <div className={s.infobarItem}>
      <div className={s.infobarItemHeader}>
        <h1>Trends for you</h1>
      </div>
      <TrendsItem />
      <TrendsItem />
      <TrendsItem />
      <a href="#">Show more</a>
    </div>
  )
}

export default Trends
