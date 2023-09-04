import React, { FC, useState, useEffect } from "react"
import s from "./Home.module.scss"
import NewTweet from "./NewTweet/NewTweet"
import PostItem from "../../components/PostItem/PostItem"
import Infobar from "../../components/Infobar/Infobar"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store/store"

const settingLists = [
  { name: "For you", id: 0, sort: "all" },
  { name: "Following", id: 1, sort: "following" },
]

const Home: FC = () => {
  const navigate = useNavigate()
  const [postSettings, setPostSettings] = useState<number>(0)
  const [scrollToTop, setScrollToTop] = useState<boolean>(false)
  const { error } = useSelector((s: RootState) => s.authReducer)
  const { user } = useSelector((s: RootState) => s.profileReducer)

  useEffect(() => {
    //@ts-ignore
    const userUID = JSON.parse(localStorage.getItem("FB_auth"))
    if (!userUID || error) {
      navigate("/auth/signin")
    }
  }, [error])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [postSettings, scrollToTop])

  if (error) {
    return <div></div>
  }

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
                  className={index === postSettings ? s.active : ""}
                  onClick={() => setPostSettings(item.id)}
                >
                  <h1>{item.name}</h1>
                </div>
              )
            })}
          </div>
        </div>
        <div className={s.homeContent}>{user && <NewTweet user={user} />}</div>
      </div>
      <Infobar />
    </>
  )
}

export default Home
