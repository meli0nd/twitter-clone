import React, { FC, useState } from "react"
import { NavLink } from "react-router-dom"
import s from "./Navbar.module.scss"
type TPopUp = {
  login?: string | null | undefined
  onLogOut: () => void
}

const PopUp: FC<TPopUp> = ({ login, onLogOut }) => {
  return (
    <div className={s.navbarPopUpContainer}>
      <div className={s.navbarPopUp}>
        <NavLink to="/auth/signup" className={s.popUpItem} onClick={onLogOut}>
          <span>Log out @{login}</span>
        </NavLink>
      </div>
    </div>
  )
}

export default PopUp
