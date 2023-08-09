import React, { FC, useState, useEffect } from "react"
import s from "./Home.module.scss"
import NewTweet from "../../components/HomePage/NewTweet/NewTweet"
import PostItem from "../../components/HomePage/PostItem/PostItem"
import Infobar from "../../components/Infobar/Infobar"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store/store"
import { useNavigate } from "react-router-dom"

const settingLists = [
  { name: "For you", id: 0, sort: "all" },
  { name: "Following", id: 1, sort: "following" },
]

const Home: FC = () => {
  const [postSettings, setPostSettings] = useState<number>(0)
  const [scrollToTop, setScrollToTop] = useState<boolean>(false)
  const { isAuth } = useSelector((s: RootState) => s.userReducer)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/signup")
    }
  }, [isAuth])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [postSettings, scrollToTop])

  return (
    <>
      <div className={s.home}>
        <div
          className={s.homeHeader}
          onClick={() => setScrollToTop(!scrollToTop)}
        >
          <h1>Home</h1>
          <div className={s.homeHeaderSelect}>
            {settingLists.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={index === postSettings && s.active}
                  onClick={() => setPostSettings(item.id)}
                >
                  <h1>{item.name}</h1>
                </div>
              )
            })}
          </div>
        </div>
        <div className={s.homeContent}>
          <NewTweet />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>
      <Infobar />
    </>
  )
}

export default Home
