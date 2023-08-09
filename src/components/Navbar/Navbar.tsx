import React, { FC, useState, useEffect, useRef } from "react"
import s from "./Navbar.module.scss"
import User from "./User/User"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store/store"
import { useDispatch } from "react-redux"
import { signOutAction } from "../../Redux/reducers/user"

const navLinks = [
  {
    name: "Home",
    link: "/home",
    id: 0,
    img: "img/navbar/nav-home-outlined.svg",
    imgActive: "img/navbar/nav-home-filled.svg",
  },
  {
    name: "Explore",
    link: "/explore",
    id: 1,
    img: "img/common/search-icon.svg",
    imgActive: "img/navbar/nav-search-filled.svg",
  },
  {
    name: "Messages",
    link: "/messages",
    id: 2,
    img: "img/navbar/nav-messages-outlined.svg",
    imgActive: "img/navbar/nav-messages-filled.svg",
  },
  {
    name: "Bookmarks",
    link: "/bookmarks",
    id: 3,
    img: "img/navbar/nav-bookmarks-outlined.svg",
    imgActive: "img/navbar/nav-bookmarks-filled.svg",
  },
  {
    name: "Users",
    link: "/users",
    id: 4,
    img: "img/navbar/nav-users-outlined.svg",
    imgActive: "img/navbar/nav-users-filled.svg",
  },
  {
    name: "Profile",
    link: "/profile",
    id: 5,
    img: "img/navbar/nav-profile-outlined.svg",
    imgActive: "img/navbar/nav-profile-filled.svg",
  },
]

const Navbar: FC = () => {
  const navigate = useNavigate()
  const [currentNavLink, setCurrentNavLink] = useState<number>(0)
  const [openUserPopUp, setOpenUserPopUp] = useState<boolean>(false)
  const popUpRef = useRef<HTMLDivElement>(null)
  const { user, isAuth } = useSelector((s: RootState) => s.userReducer)
  const dispatch = useDispatch()

  const onLogOut = () => {
    dispatch(signOutAction())
  }

  const togglePopUp = (e: any) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      setOpenUserPopUp(false)
    } else {
      setOpenUserPopUp(true)
    }
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/signup")
    }
  }, [isAuth])

  useEffect(() => {
    document.addEventListener("click", togglePopUp)

    return () => {
      document.removeEventListener("click", togglePopUp)
    }
  }, [currentNavLink])

  return (
    <div className={s.navbar}>
      <div className={s.navbarTop}>
        <div className={s.navbarHeader}>
          <div className={s.navbarHeaderContent}>
            <img src="img/common/main-logo.svg" alt="twitty-logo" />
            <h1>Tweety</h1>
          </div>
        </div>
        <div className={s.navbarList}>
          {navLinks.map((item, index) => {
            return (
              <NavLink
                to={item.link}
                className={`${s.navbarListItem} ${
                  currentNavLink === index && s.active
                }`}
                key={item.id}
                onClick={() => setCurrentNavLink(item.id)}
              >
                <img
                  src={currentNavLink === item.id ? item.imgActive : item.img}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
          <div className={s.navbarListItem}>
            <img src="img/navbar/nav-more.svg" alt="more icon" />
            <span>More</span>
          </div>
          <div className={s.navbarListButton}>
            <span>Tweet</span>
          </div>
        </div>
      </div>
      <div ref={popUpRef} onClick={togglePopUp}>
        <div className={s.navbarPopUpContainer}>
          {openUserPopUp && (
            <div className={s.navbarPopUp}>
              <NavLink
                to="/auth/signup"
                className={s.popUpItem}
                onClick={onLogOut}
              >
                <span>Log out @{user?.login}</span>
              </NavLink>
            </div>
          )}
        </div>
        <User name={user?.name} login={user?.login} avatar={user?.avatar} />
      </div>
    </div>
  )
}

export default Navbar
