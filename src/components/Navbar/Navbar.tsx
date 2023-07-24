import React, { FC } from "react"
import s from "./Navbar.module.scss"
import User from "./User/User"
import { NavLink } from "react-router-dom"

const Navbar: FC = () => {
  return (
    <div className={s.navbar}>
      <div className={s.navbarTop}>
        <div className={s.navbarHeader}>
          <div className={s.navbarHeaderContent}>
            <img src="img/navbar/nav-logo.svg" alt="twitti-logo" />
            <h1>Tweety</h1>
          </div>
        </div>
        <div className={s.navbarList}>
          <NavLink to="/home" className={s.navbarListItem}>
            <img src="img/navbar/nav-home-outlined.svg" alt="home icon" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/explore" className={s.navbarListItem}>
            <img src="img/infobar/infobar-search.svg" alt="explore icon" />
            <span>Explore</span>
          </NavLink>
          <NavLink to="/messages" className={s.navbarListItem}>
            <img
              src="img/navbar/nav-messages-outlined.svg"
              alt="messages icon"
            />
            <span>Messages</span>
          </NavLink>
          <NavLink to="/bookmarks" className={s.navbarListItem}>
            <img
              src="img/navbar/nav-bookmarks-outlined.svg"
              alt="bookmarks icon"
            />
            <span>Bookmarks</span>
          </NavLink>
          <NavLink to="/profile" className={s.navbarListItem}>
            <img src="img/navbar/nav-profile-outlined.svg" alt="profile icon" />
            <span>Profile</span>
          </NavLink>
          <div className={s.navbarListItem}>
            <img src="img/navbar/nav-more.svg" alt="more icon" />
            <span>More</span>
          </div>
          <div className={s.navbarListButton}>
            <span>Tweet</span>
          </div>
        </div>
      </div>
      <User image="http://zbs-sticker.by/stories/images/prod/3862x0ccc-300x220.png" />
    </div>
  )
}

export default Navbar
