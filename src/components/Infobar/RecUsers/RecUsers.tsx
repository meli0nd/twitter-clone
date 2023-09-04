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
      {users.length ? (
        users.map((user: any) => {
          return (
            <RecUserItem
              key={user.userId}
              avatar={user.avatar}
              login={user.login}
              username={user.name}
            />
          )
        })
      ) : (
        <span
          style={{
            display: "inline-block",
            padding: "10px",
          }}
        >
          No users to recommend :(
        </span>
      )}
      <NavLink to="/users">Show more</NavLink>
    </div>
  )
}

export default RecUsers
