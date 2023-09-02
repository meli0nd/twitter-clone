import React, { FC, useEffect } from "react"
import s from "./Infobar.module.scss"
import Trends from "./Trends/Trends"
import RecUsers from "./RecUsers/RecUsers"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store/store"
import { getAllUsersThunk } from "../../Redux/reducers/users"
type TInfobar = {
  profileEditPopUp?: boolean
}

const Infobar: FC<TInfobar> = ({ profileEditPopUp }) => {
  const dispatch = useDispatch()
  const { users } = useSelector((s: RootState) => s.usersReducer)
  const { user } = useSelector((s: RootState) => s.profileReducer)
  const usersWithoutAuthUser = Object.values(users).filter(
    (item: any) => item.login !== user?.login
  )

  useEffect(() => {
    //@ts-ignore
    dispatch(getAllUsersThunk())
  }, [])
  return (
    <div className={`${s.infobar} ${profileEditPopUp && s.infobarActive}`}>
      <div className={s.infobarSearch}>
        <img src="img/common/search-icon.svg" alt="search" />
        <input type="search" placeholder="Search Tweety" />
      </div>
      <Trends />
      {usersWithoutAuthUser && (
        <RecUsers users={usersWithoutAuthUser.splice(0, 3)} />
      )}
    </div>
  )
}

export default Infobar
