import React, { FC } from "react"
import s from "./Navbar.module.scss"
import User from "./User/User"

const Navbar: FC = () => {
  return (
    <div className={s.navbar}>
      <div className={s.navbarTop}>
        <div className={s.navbarHeader}>
          <div className={s.navbarHeaderContent}>
            <img src="img/nav-logo.svg" alt="twitti-logo" />
            <h1>Tweety</h1>
          </div>
        </div>
        <div className={s.navbarList}>
          <div className={s.navbarListItem}>
            <img src="img/nav-home-outlined.svg" alt="home icon" />
            <span>Home</span>
          </div>
          <div className={s.navbarListItem}>
            <img src="img/infobar-search.svg" alt="explore icon" />
            <span>Explore</span>
          </div>
          <div className={s.navbarListItem}>
            <img src="img/nav-messages-outlined.svg" alt="messages icon" />
            <span>Messages</span>
          </div>
          <div className={s.navbarListItem}>
            <img src="img/bookmarks-outlined.svg" alt="bookmarks icon" />
            <span>Bookmarks</span>
          </div>
          <div className={s.navbarListItem}>
            <img src="img/nav-profile-outlined.svg" alt="profile icon" />
            <span>Profile</span>
          </div>
          <div className={s.navbarListItem}>
            <img src="img/more.svg" alt="more icon" />
            <span>More</span>
          </div>
          <div className={s.navbarListButton}>
            <span>Tweet</span>
          </div>
        </div>
      </div>
      <User image="https://coughlinlaw.com/wp-content/uploads/2017/02/pic7.jpg" />
    </div>
  )
}

export default Navbar
