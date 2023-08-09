import React from "react"
import s from "../Infobar.module.scss"

const TrendsItem = () => {
  return (
    <div className={s.trendsItem}>
      <div className={s.trendsItemInfo}>
        <span>Trending in Germanysadsad</span>
        <h1>Revolution123123123</h1>
        <span>50.4K Tweets</span>
      </div>
      <img src="img/common/more-info-icon.svg" alt="show more" />
    </div>
  )
}

export default TrendsItem
