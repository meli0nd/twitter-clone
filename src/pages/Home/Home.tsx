import React from "react"
import s from "./Home.module.scss"
import TrendsItem from "../../components/Infobar/Trends/TrendsItem"

const Home = () => {
  return (
    <div className={s.home}>
      <div className={s.homeHeader}>
        <h1>Home</h1>
        <div className={s.homeHeaderSelect}>
          <div className={s.active}>
            <h1>For you</h1>
          </div>
          <div>
            <h1>Following</h1>
          </div>
        </div>
      </div>
      <div className={s.homeContent}>
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
      </div>
    </div>
  )
}

export default Home
