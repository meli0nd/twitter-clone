import React, { FC, useEffect } from "react"
import s from "../Profile.module.scss"
import { useNavigate } from "react-router-dom"

type TUserInfoProps = {
  setProfileEditPopUp: (bool: boolean) => void
  user: any
  isAuth: boolean
}

const UserInfo: FC<TUserInfoProps> = ({
  setProfileEditPopUp,
  user,
  isAuth,
}) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/signup")
    }
  }, [isAuth])
  return (
    <>
      <div className={s.userInfoContainer}>
        <div className={s.userInfoBanner}>
          <img
            src={
              user?.banner?.length > 1
                ? user?.banner
                : "https://pbs.twimg.com/profile_banners/1680124447754272768/1690906783/600x200"
            }
            alt="banner"
          />
        </div>
        <div className={s.userInfoAvatarBtn}>
          <div className={s.userInfoAvatarContainer}>
            <div
              className={s.userInfoAvatarImage}
              style={
                user?.avatar?.length === 0
                  ? {
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      height: "100px",
                      width: "100px",
                      display: "flex",
                      alignItems: "center",
                      top: "-130%",
                      position: "absolute",
                      justifyContent: "center",
                    }
                  : {
                      top: "-140%",
                      position: "absolute",
                    }
              }
            >
              <img
                src={
                  user?.avatar?.length > 1
                    ? user?.avatar
                    : "img/common/main-logo.svg"
                }
                alt="user avatar"
                style={
                  user?.avatar?.length === 0
                    ? {
                        width: "70px",
                        height: "70px",
                        borderRadius: "0",
                        border: "none",
                      }
                    : {
                        width: "120px",
                        height: "120px",
                        border: "4px solid #fff",
                      }
                }
              />
            </div>
          </div>
          <div
            className={s.userInfoEditBtn}
            onClick={() => setProfileEditPopUp(true)}
          >
            Edit profile
          </div>
        </div>
      </div>
      <div className={s.userInfoData}>
        <h1>{user?.name}</h1>
        <h2>@{user?.login}</h2>
        {user?.bio && <span>{user?.bio}</span>}
      </div>
      <div className={s.userInfoAbout}>
        {user?.location.length > 1 && (
          <div className={s.location}>
            <img src="img/profilePage/location.svg" alt="location" />
            <span>{user?.location}</span>
          </div>
        )}
        {user?.website.length > 1 && (
          <div className={s.website}>
            <img src="img/profilePage/website.svg" alt="website" />
            <a href="#">{user?.website}</a>
          </div>
        )}
        <div className={s.birthday}>
          <img src="img/profilePage/birthday.svg" alt="birthday" />
          <span>
            Born {user?.userBirthDate.month} {user?.userBirthDate.day},{" "}
            {user?.userBirthDate.year}
          </span>
        </div>
        <div className={s.calendar}>
          <img src="img/profilePage/calendar.svg" alt="calendar" />
          <span>Joined May 2020</span>
        </div>
      </div>
      <div className={s.userFollowing}>
        <div className={s.userFollowingCount}>
          <b>1</b> Following
        </div>
        <div className={s.userFollowersCount}>
          <b>1</b> Followers
        </div>
      </div>
    </>
  )
}

export default UserInfo
