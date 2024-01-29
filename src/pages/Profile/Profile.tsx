import React, { FC, useEffect, useState } from "react"
import Infobar from "../../components/Infobar/Infobar"
import s from "./Profile.module.scss"
import PostItem from "../../components/PostItem/PostItem"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import UserInfo from "./components/UserInfo"
import ProfileEditPopUp from "./components/ProfileEditPopUp"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store/store"
import { useDispatch } from "react-redux"
import Loader from "../../components/Loader/Loader"
import { getUserThunk } from "../../Redux/reducers/user-profile"

const Profile: FC = () => {
  const dispatch = useDispatch()
  const [scrollToTop, setScrollToTop] = useState<boolean>(false)
  const [profileEditPopUp, setProfileEditPopUp] = useState<boolean>(false)
  const navigate = useNavigate()
  const { user } = useSelector((s: RootState) => s.profileReducer)
  const { users } = useSelector((s: RootState) => s.usersReducer)
  const { profileLoading } = useSelector((s: RootState) => s.profileReducer)
  useEffect(() => {
    if (!user) {
      //@ts-ignore
      dispatch(getUserThunk())
    }
  }, [profileLoading, user])
  const { id } = useParams()
  const profileOwner =
    users && Object.values(users).filter((user: any) => user.login === id)
  const isOwner = id === user?.login
  const profileNav =
    user && profileOwner
      ? [
          // @ts-ignore
          { name: "Tweets", id: 0, link: `/${profileOwner[0].login}` },
          // @ts-ignore
          { name: "Media", id: 1, link: `/${profileOwner[0].login}/media` },
          // @ts-ignore
          { name: "Likes", id: 2, link: `/${profileOwner[0].login}/likes` },
        ]
      : [{ name: "0", id: 0, link: `/0/likes` }]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [scrollToTop])

  if (profileEditPopUp) {
    document.body.style.overflowY = "hidden"
    document.body.style.overflowX = "hidden"
  } else {
    document.body.style.overflowY = "scroll"
    document.body.style.overflowX = "auto"
  }

  if (!user) {
    return (
      <div>
        <Loader title="Loading profile..." />
      </div>
    )
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
            <h1>{profileOwner[0].name}</h1>
            <span>
              {profileOwner[0]?.posts?.length > 1
                ? profileOwner[0]?.posts?.length - 1
                : "0"}{" "}
              Tweets
            </span>
          </div>
        </div>
        {profileOwner && (
          <UserInfo
            setProfileEditPopUp={setProfileEditPopUp}
            user={user}
            isOwner={isOwner}
            profileEditPopUp={profileEditPopUp}
          />
        )}
        <div className={s.profileTweetsOptions}>
          {profileNav.map((item) => {
            return (
              <NavLink
                to={item.link}
                className={(linkData) => (linkData.isActive ? s.active : "")}
                key={item.id}
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
