import React, { FC } from "react"
import s from "../Infobar.module.scss"
import RecUserItem from "./RecUserItem"
import { NavLink } from "react-router-dom"
type TRecUsers = {
  users: any
}

const RecUsers: FC<TRecUsers> = ({ users }) => {
  return (
    <div className={s.infobarItem}>
      <div className={s.infobarItemHeader}>
        <h1>Who to follow</h1>
      </div>
      {users &&
        users.map((user: any) => {
          return (
            <RecUserItem
              key={user.userId}
              avatar={user.avatar}
              login={user.login}
              username={user.name}
            />
          )
        })}
      <NavLink to="/users">Show more</NavLink>
    </div>
  )
}

export default RecUsers
