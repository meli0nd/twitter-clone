import React from "react"
import s from "./SignUp.module.scss"
import { NavLink } from "react-router-dom"

const SignUp = () => {
  return (
    <div className={s.signUp}>
      <div className={s.signUpLeftSide}>
        <img src="img/signup/left-side-bg.png" alt="tweety bg" />
      </div>
      <div className={s.signUpRightSide}>
        <div className={s.signUpRightLogo}>
          <img src="img/common/main-logo.svg" alt="main logo" />
        </div>
        <h1>Happening now</h1>
        <h2>Join Tweety today</h2>
        <div className={s.signUpOptions}>
          <NavLink to="/auth/signup/email" className={s.signUpEmail}>
            Sign up with phone or email
          </NavLink>
        </div>
        <div className={s.toSignIn}>
          <span>Already have account?</span>
          <NavLink to="/auth/signin">Log in</NavLink>
        </div>
      </div>
    </div>
  )
}

export default SignUp
