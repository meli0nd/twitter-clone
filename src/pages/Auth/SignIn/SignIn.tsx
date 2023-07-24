import React from "react"
import s from "./SignIn.module.scss"
import { NavLink } from "react-router-dom"

const SignIn = () => {
  return (
    <div className={s.signIn}>
      <div className={s.signInLogo}>
        <img src="img/navbar/nav-logo.svg" alt="logo" />
      </div>
      <h1>Log in to Tweety</h1>
      <div className={s.signInForm}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className={s.signInBtn}>Log In</button>
      </div>
      <NavLink to="/auth/signup" className={s.signInOptions}>
        <span>Sign Up to Tweety</span>
      </NavLink>
    </div>
  )
}

export default SignIn
