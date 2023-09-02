import React, { FC } from "react"
import s from "./Navbar.module.scss"
import { NavLink } from "react-router-dom"
type TNavbarList = {
  path: string
}

const navbarItems = [
  {
    id: 0,
    pathTo: "/home",
    name: "Home",
    image: "img/navbar/nav-home-outlined.svg",
    imageActive: "img/navbar/nav-home-filled.svg",
  },
  {
    id: 1,
    pathTo: "/explore",
    name: "Explore",
    image: "img/common/search-icon.svg",
    imageActive: "img/navbar/nav-search-filled.svg",
  },
  {
    id: 2,
    pathTo: "/messages",
    name: "Messages",
    image: "img/navbar/nav-messages-outlined.svg",
    imageActive: "img/navbar/nav-messages-filled.svg",
  },
  {
    id: 3,
    pathTo: "/bookmarks",
    name: "Bookmarks",
    image: "img/navbar/nav-bookmarks-outlined.svg",
    imageActive: "img/navbar/nav-bookmarks-filled.svg",
  },
  {
    id: 4,
    pathTo: "/users",
    name: "Users",
    image: "img/navbar/nav-users-outlined.svg",
    imageActive: "img/navbar/nav-users-filled.svg",
  },
  {
    id: 5,
    pathTo: "/profile/",
    name: "Profile",
    image: "img/navbar/nav-profile-outlined.svg",
    imageActive: "img/navbar/nav-profile-filled.svg",
  },
]

const NavbarList: FC<TNavbarList> = ({ path }) => {
  return (
    <div className={s.navbarList}>
      {navbarItems.map((navLink) => {
        return (
          <div key={navLink.id}>
            <NavLink
              to={navLink.pathTo}
              className={(navData) =>
                navData.isActive
                  ? `${s.navbarListItem} ${s.active}`
                  : `${s.navbarListItem}`
              }
            >
              <img
                src={
                  path.includes(navLink.pathTo)
                    ? navLink.imageActive
                    : navLink.image
                }
                alt=""
              />
              <span>{navLink.name}</span>
            </NavLink>
          </div>
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
  )
}

export default NavbarList
