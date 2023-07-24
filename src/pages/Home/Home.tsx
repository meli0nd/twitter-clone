import React, { FC } from "react"
import s from "./Home.module.scss"
import NewTweet from "../../components/HomePage/NewTweet/NewTweet"
import PostItem from "../../components/HomePage/PostItem/PostItem"
import Infobar from "../../components/Infobar/Infobar"
import Navbar from "../../components/Navbar/Navbar"

const Home: FC = () => {
  return (
    <>
      <Navbar />
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
          <NewTweet />
          <PostItem />
        </div>
      </div>
      <Infobar />
    </>
  )
}

export default Home
