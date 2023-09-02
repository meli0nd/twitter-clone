import React, { useState, FC, useEffect } from "react"
import s from "./SignIn.module.scss"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store/store"
import { useForm } from "react-hook-form"
import { formRegex } from "../../../assets/regex"
import {
  setError,
  setRegisterSuccess,
  signInThunk,
} from "../../../Redux/reducers/auth"
import { useDispatch } from "react-redux"
import Message from "../../../components/Message/Message"

type TSignInForm = {
  email: string
  password: string
}

const SignIn: FC = () => {
  const { error, registerSuccess } = useSelector(
    (s: RootState) => s.authReducer
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignInForm>({ mode: "onChange" })
  const onSubmit = (data: any) => {
    // @ts-ignore
    dispatch(signInThunk(data))
    navigate("/home")
  }

  useEffect(() => {}, [error, registerSuccess])

  return (
    <div className={s.signIn}>
      {registerSuccess && (
        <Message title="Account added successfully" success={true} />
      )}
      {error && <Message title={error} success={false} />}
      <div className={s.signInLogo}>
        <img src="img/common/main-logo.svg" alt="logo" />
      </div>
      <h1>Log in to Tweety</h1>
      <form className={s.signInForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            maxLength: 20,
            pattern: formRegex.email,
          })}
          maxLength={20}
          style={
            errors.email && {
              border: "2px solid red",
            }
          }
        />
        {errors.email?.type === "required" && (
          <span className={s.errorMessage}>Email is required</span>
        )}
        {errors.email?.type === "pattern" && (
          <span className={s.errorMessage}>Invalid email</span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />
        <input type="submit" className={s.signInBtn} defaultValue="Log In" />
      </form>
      <NavLink to="/auth/signup" className={s.signInOptions}>
        <span>Sign Up to Tweety</span>
      </NavLink>
    </div>
  )
}

export default SignIn
