import React, { FC, useState, useEffect, useRef } from "react"
import s from "./Navbar.module.scss"
import User from "./User/User"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store/store"
import { useDispatch } from "react-redux"
import { getUserThunk, signOutAction } from "../../Redux/reducers/user-profile"
import NavbarList from "./NavbarList"
import PopUp from "./PopUp"
import { getAllUsersThunk } from "../../Redux/reducers/users"

const Navbar: FC = () => {
  const location = useLocation()
  const [openUserPopUp, setOpenUserPopUp] = useState<boolean>(false)
  const navigate = useNavigate()
  const popUpRef = useRef<HTMLDivElement>(null)
  const { user } = useSelector((s: RootState) => s.profileReducer)
  const { users } = useSelector((s: RootState) => s.usersReducer)
  const { error } = useSelector((s: RootState) => s.authReducer)
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
    //@ts-ignore
    const userUID = JSON.parse(localStorage.getItem("FB_auth"))
    if (!userUID) {
      navigate("/auth/signin")
    }
    if (!user) {
      //@ts-ignore
      dispatch(getUserThunk())
    }

    if (!users) {
      //@ts-ignore
      dispatch(getAllUsersThunk())
    }
  }, [error])

  useEffect(() => {
    document.addEventListener("click", togglePopUp)

    return () => {
      document.removeEventListener("click", togglePopUp)
    }
  }, [])

  if (error) {
    return <div></div>
  }

  return (
    <div className={s.navbar}>
      <div className={s.navbarTop}>
        <div className={s.navbarHeader}>
          <div className={s.navbarHeaderContent}>
            <img src="img/common/main-logo.svg" alt="twitty-logo" />
            <h1>Tweety</h1>
          </div>
        </div>
        <NavbarList path={location.pathname} />
      </div>
      <div ref={popUpRef} onClick={togglePopUp}>
        {openUserPopUp && <PopUp onLogOut={onLogOut} login={user?.login} />}
        <User name={user?.name} login={user?.login} avatar={user?.avatar} />
      </div>
    </div>
  )
}

export default Navbar
