import React, { useState, useEffect } from "react"
import s from "./SignUpEmail.module.scss"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { formRegex } from "../../../../assets/regex"
import { useDispatch } from "react-redux"
import {
  setRegisterSuccess,
  signUpThunk,
} from "../../../../Redux/reducers/auth"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../../Redux/store/store"
import { getAllUsersLoginThunk } from "../../../../Redux/reducers/users"
import ErrorMessage from "../../../../components/Message/Message"
import Message from "../../../../components/Message/Message"

type TSignUpForm = {
  avatar?: FileList
  name: string
  login: string
  email: string
  day: string
  month: string
  year: string
  password: string
  confirm_password: string
}

const SignUpEmail = () => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSignUpForm>({
    mode: "onChange",
  })

  const [pageCount, setPageCount] = useState<number>(1)
  const [showPass, setShowPass] = useState<boolean>(false)
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { usersLogin, usersEmail } = useSelector(
    (s: RootState) => s.usersReducer
  )
  const onSubmit = (data: any) => {
    if (usersLogin.includes(data.login)) {
      setError("Login is already taken")
    } else if (usersEmail.includes(data.email)) {
      setError("Email is already taken")
    } else {
      if (pageCount === 3) {
        setError(null)
        const userData = {
          avatar: data.avatar[0],
          userBirthDate: {
            day: data.day,
            month: data.month,
            year: data.year,
          },
          name: data.name,
          login: data.login,
          password: data.password,
          email: data.email,
          banner: "",
          bio: "",
          location: "",
          website: "",
          posts: [
            {
              muting: "mute for Firebase",
            },
          ],
          following: [
            {
              muting: "mute for Firebase",
            },
          ],
          bookmarks: [
            {
              muting: "mute for Firebase",
            },
          ],
        }
        // @ts-ignore
        dispatch(signUpThunk(userData))
        navigate("/auth/signin")
      } else if (!usersLogin.includes(data.login)) {
        setError(null)
        setPageCount((prev) => prev + 1)
      }
    }
  }
  const userData = getValues()

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {})
    return () => {
      subscription.unsubscribe()
    }
  }, [watch])

  useEffect(() => {
    //@ts-ignore
    dispatch(getAllUsersLoginThunk())
  }, [])

  return (
    <form className={s.signUpEmail} onSubmit={handleSubmit(onSubmit)}>
      {error && <Message title={error} />}
      {pageCount === 1 && (
        <div className={s.signUpEmailContainer}>
          <img src="img/common/main-logo.svg" alt="main logo" />
          <h1>Create an account</h1>
          <div className={s.signUpEmailForm}>
            <input
              type="text"
              placeholder="Login"
              {...register("login", {
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
              maxLength={20}
              minLength={3}
              style={
                errors.login || error === "Login is already taken"
                  ? {
                      border: "2px solid red",
                    }
                  : {}
              }
            />
            {errors.login?.type === "required" && (
              <span className={s.errorMessage}>Name is required</span>
            )}
            {errors.login?.type === "minLength" && (
              <span className={s.errorMessage}>
                Name must be more than 3 letters
              </span>
            )}
            <input
              type="text"
              placeholder="Your name"
              {...register("name", {
                required: true,
                maxLength: 20,
                minLength: 3,
                pattern: formRegex.name,
              })}
              maxLength={20}
              minLength={3}
              style={
                errors.name && {
                  border: "2px solid red",
                }
              }
            />
            {errors.name?.type === "required" && (
              <span className={s.errorMessage}>Your name is required</span>
            )}
            {errors.name?.type === "pattern" && (
              <span className={s.errorMessage}>Invalid name</span>
            )}
            {errors.name?.type === "minLength" && (
              <span className={s.errorMessage}>
                Name must be more than 3 letters
              </span>
            )}
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
                errors.email || error === "Email is already taken"
                  ? {
                      border: "2px solid red",
                    }
                  : {}
              }
            />
            {errors.email?.type === "required" && (
              <span className={s.errorMessage}>Email is required</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className={s.errorMessage}>Invalid email</span>
            )}
            <div className={s.signUpFormDate}>
              <span>Date of birth</span>
              <div className={s.signUpDate}>
                <div className={s.signUpMonth}>
                  <select
                    aria-label="img/auth/arrow-down.svg"
                    id="month"
                    className={s.signUpMonth}
                    {...register("month", {
                      required: true,
                    })}
                    style={
                      errors.month && {
                        border: "2px solid red",
                      }
                    }
                  >
                    <option value="">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  <img src="img/auth/arrow-down.svg" alt="arrow down" />
                </div>
                <div className={s.signUpDay}>
                  <select
                    id="day"
                    {...register("day", {
                      required: true,
                    })}
                    style={
                      errors.day && {
                        border: "2px solid red",
                      }
                    }
                  >
                    <option value="">Day</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="11">12</option>
                    <option value="11">13</option>
                    <option value="11">14</option>
                    <option value="11">15</option>
                    <option value="11">16</option>
                    <option value="11">17</option>
                    <option value="11">18</option>
                    <option value="11">19</option>
                    <option value="11">20</option>
                    <option value="11">21</option>
                    <option value="11">22</option>
                    <option value="11">23</option>
                    <option value="11">24</option>
                    <option value="11">25</option>
                    <option value="11">26</option>
                    <option value="11">27</option>
                    <option value="11">28</option>
                    <option value="11">29</option>
                    <option value="11">30</option>
                    <option value="11">31</option>
                  </select>
                  <img src="img/auth/arrow-down.svg" alt="arrow down" />
                </div>
                <div className={s.signUpYear}>
                  <select
                    id="year"
                    {...register("year", {
                      required: true,
                    })}
                    style={
                      errors.year && {
                        border: "2px solid red",
                      }
                    }
                  >
                    <option value="">Year</option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                  </select>
                  <img src="img/auth/arrow-down.svg" alt="arrow down" />
                </div>
              </div>
            </div>

            <button
              className={s.signUpBtn}
              onClick={() => handleSubmit(onSubmit)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {pageCount === 2 && (
        <div className={s.signUpEmailContainer}>
          <img src="img/common/main-logo.svg" alt="main logo" />
          <h1>Create an account</h1>
          <div className={s.signUpEmailFormSecond}>
            <div className={s.inputContainer}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                })}
                maxLength={20}
                minLength={3}
                style={
                  errors.password && {
                    border: "2px solid red",
                  }
                }
              />
              <div
                className={s.showPass}
                onClick={() => setShowPass(!showPass)}
              >
                <img
                  src={
                    showPass
                      ? "img/auth/hide-pass.svg"
                      : "img/auth/show-pass.svg"
                  }
                  alt="show pass"
                />
              </div>
              {errors.password?.type === "required" && (
                <span className={s.errorMessage}>Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className={s.errorMessage}>
                  Password must be more than 8 symbols
                </span>
              )}
            </div>
            <div className={s.inputContainer}>
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirm_password", {
                  required: true,
                  maxLength: 20,
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match"
                    }
                  },
                })}
                maxLength={20}
              />
              <div
                className={s.showPass}
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                <img
                  src={
                    showConfirmPass
                      ? "img/auth/hide-pass.svg"
                      : "img/auth/show-pass.svg"
                  }
                  alt="show pass"
                />
              </div>
              {errors.confirm_password?.type === "required" && (
                <span className={s.errorMessage}>
                  Confirm password is required
                </span>
              )}
              {errors.confirm_password?.type === "validate" && (
                <span className={s.errorMessage}>
                  {errors.confirm_password.message?.toString()}
                </span>
              )}
            </div>
            <span>Choose avatar</span>
            <input
              className={s.uploadAvatar}
              type="file"
              accept="image/png, image/jpeg"
              {...register("avatar", { required: false })}
            />
            <button
              className={s.signUpBtn}
              onClick={() => handleSubmit(onSubmit)}
            >
              Next
            </button>
            <button
              className={s.signUpBtn}
              onClick={() => {
                setPageCount((prev) => (prev = 1))
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {pageCount === 3 && (
        <div className={s.signUpEmailContainer}>
          <img src="img/common/main-logo.svg" alt="main logo" />
          <h1>Create an account</h1>
          <div className={s.signUpEmailFormFinal}>
            <div className={s.signUpProfileView}>
              {userData?.avatar && userData?.avatar[0] ? (
                <img
                  src={URL.createObjectURL(userData?.avatar[0])}
                  alt="profile image"
                />
              ) : (
                <div
                  style={{
                    borderRadius: "50%",
                    border: "1px solid #999",
                    backgroundColor: "#fff",
                    height: "100px",
                    width: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="img/common/main-logo.svg"
                    alt="profile image"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "0",
                    }}
                  />
                </div>
              )}
              <div className={s.signUpProfileInfo}>
                <h1>{userData?.name}</h1>
                <span>@{userData?.login}</span>
              </div>
            </div>
            <input type="submit" id="submitForm" />
            <label htmlFor="submitForm" className={s.signUpBtn}>
              Okay
            </label>
            <button
              className={s.signUpBtn}
              onClick={() => setPageCount((prev) => (prev = 2))}
            >
              Back
            </button>
          </div>
        </div>
      )}

      <div className={s.bottom}>
        <NavLink to="/auth/signin">Log in</NavLink>
        <div className={s.signUpCount}>
          <span className={`${s.signCount} + ${pageCount === 1 && s.active}`}>
            1
          </span>
          <div className={s.signCountLine}></div>
          <span className={`${s.signCount} + ${pageCount === 2 && s.active}`}>
            2
          </span>
          <div className={s.signCountLine}></div>
          <span className={`${s.signCount} + ${pageCount === 3 && s.active}`}>
            3
          </span>
        </div>
      </div>
    </form>
  )
}

export default SignUpEmail
