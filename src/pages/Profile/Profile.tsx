import React, { FC, useEffect, useState } from "react"
import Infobar from "../../components/Infobar/Infobar"
import s from "./Profile.module.scss"
import PostItem from "../../components/HomePage/PostItem/PostItem"
import { NavLink, useNavigate } from "react-router-dom"
import UserInfo from "./components/UserInfo"
import ProfileEditPopUp from "./components/ProfileEditPopUp"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store/store"

const profileNav = [
  { name: "Tweets", id: 0, link: "/profile" },
  { name: "Media", id: 1, link: "media" },
  { name: "Likes", id: 2, link: "likes" },
]

const Profile: FC = () => {
  const [currentLink, setCurrentLink] = useState<number>(0)
  const [scrollToTop, setScrollToTop] = useState<boolean>(false)
  const [profileEditPopUp, setProfileEditPopUp] = useState<boolean>(false)
  const navigate = useNavigate()
  const { user, isAuth } = useSelector((s: RootState) => s.userReducer)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentLink, scrollToTop])

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/signup")
    }
  }, [isAuth])

  if (profileEditPopUp) {
    document.body.style.overflowY = "hidden"
    document.body.style.overflowX = "hidden"
  } else {
    document.body.style.overflowY = "scroll"
    document.body.style.overflowX = "auto"
  }

  return (
    <div className={s.profile}>
      {profileEditPopUp && (
        <>
          <div className={s.popUpOverlay}></div>
          <ProfileEditPopUp setProfileEditPopUp={setProfileEditPopUp} />
        </>
      )}

      <div className={s.profileContent}>
        <div
          className={s.profileHeader}
          onClick={() => setScrollToTop(!scrollToTop)}
        >
          <div className={s.profileArrow} onClick={() => navigate(-1)}>
            <img src="img/common/arrow.svg" alt="arrow" />
          </div>
          <div className={s.profileHeaderUser}>
            <h1>{user?.name}</h1>
            <span>3 Tweets</span>
          </div>
        </div>
        <UserInfo
          setProfileEditPopUp={setProfileEditPopUp}
          user={user}
          isAuth={isAuth}
        />
        <div className={s.profileTweetsOptions}>
          {profileNav.map((item, index) => {
            return (
              <NavLink
                to={item.link}
                className={index === currentLink ? s.active : ""}
                key={item.id}
                onClick={() => setCurrentLink(index)}
              >
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </div>
        <div className={s.profilePosts}>
          <PostItem />
          <PostItem />
        </div>
      </div>
      <Infobar profileEditPopUp={profileEditPopUp} />
    </div>
  )
}

export default Profile
