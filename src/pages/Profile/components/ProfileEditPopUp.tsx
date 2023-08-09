import React, { FC, useEffect, useRef, useState } from "react"
import s from "../Profile.module.scss"
import { useForm } from "react-hook-form"
import { formRegex } from "../../../assets/regex"
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store/store"
import { useDispatch } from "react-redux"
import { updateUserPopUp } from "../../../Redux/reducers/user"

type TProfilEditPopUp = {
  setProfileEditPopUp: any
}

const ProfileEditPopUp: FC<TProfilEditPopUp> = ({ setProfileEditPopUp }) => {
  const popUpBody = useRef<HTMLDivElement>(null)
  const { user } = useSelector((s: RootState) => s.userReducer)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({ mode: "onChange" })
  const formValues = getValues()
  const nameLength = formValues.name ? formValues.name.length : 0
  const [nameInputActive, setNameInputActive] = useState<boolean>(false)
  const bioLength = formValues.bio ? formValues.bio.length : 0
  const [bioInputActive, setBioInputActive] = useState<boolean>(false)
  const locationLength = formValues.location ? formValues.location.length : 0
  const [locationInputActive, setLocationInputActive] = useState<boolean>(false)
  const websiteLength = formValues.website ? formValues.website.length : 0
  const [websiteInputActive, setWebsiteInputActive] = useState<boolean>(false)

  const onClickOutSide = (event: any) => {
    if (popUpBody.current && !popUpBody.current.contains(event.target)) {
      setProfileEditPopUp(false)
    }
  }

  const onSubmit = (data: any) => {
    const values = getValues()
    const userData = {
      avatar: values.avatar.length ? URL.createObjectURL(values.avatar[0]) : "",
      banner: values.banner.length ? URL.createObjectURL(values.avatar[0]) : "",
      name: values.name,
      bio: values.bio || "",
      location: values.location || "",
      website: values.website || "",
    }
    dispatch(updateUserPopUp(userData))
    setProfileEditPopUp(false)
  }

  const onDeleteBanner = () => {
    console.log("delete banner")
  }

  useEffect(() => {
    const nameWatch = watch("name")
    const avatarWatch = watch("avatar")
    const bioWatch = watch("bio")
    const locationWatch = watch("location")
    const websiteWatch = watch("website")
    const subscription = watch((value, { name, type }) => {})
    return () => {
      subscription.unsubscribe()
    }
  }, [watch])

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("mousedown", onClickOutSide)
    }, 200)

    return () => {
      document.removeEventListener("mousedown", onClickOutSide)
    }
  }, [])

  return (
    <form
      className={s.profileEditPopUpContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={s.profileEditPopUp} ref={popUpBody}>
        <div className={s.popUpHeader}>
          <div className={s.headerLeftSide}>
            <div
              className={s.closeBtn}
              onClick={() => setProfileEditPopUp(false)}
            >
              <img src="img/common/close.svg" alt="X" />
            </div>
            <h1>Edit profile</h1>
          </div>
          <input
            type="submit"
            className={s.saveBtn}
            onClick={onSubmit}
            value="Save"
          />
        </div>
        <div className={s.profileBanner}>
          <div className={s.bannerBtns}>
            <div>
              <input
                type="file"
                id="profileBanner"
                accept="image/png, image/jpeg"
                {...register("banner", { required: false })}
              />
              <label htmlFor="profileBanner">
                <img src="img/common/upload.svg" alt="upload" />
              </label>
            </div>
            <div onClick={onDeleteBanner}>
              <img src="img/common/close.svg" alt="close" />
            </div>
          </div>
          <div className={s.bannerOverlay}></div>
          <img
            src={
              user?.banner
                ? user?.banner
                : "https://pbs.twimg.com/profile_banners/1680124447754272768/1690906783/600x200"
            }
            alt="banner"
          />
        </div>
        <div className={s.profileAvatarContainer}>
          <div className={s.profileAvatarBtn}>
            <div>
              <label htmlFor="profileAvatar">
                <img src="img/common/upload.svg" alt="upload" />
              </label>
              <input
                type="file"
                id="profileAvatar"
                accept="image/png, image/jpeg"
                {...register("avatar", {
                  required: false,
                })}
              />
            </div>
          </div>
          <div
            className={s.profileAvatar}
            style={
              user?.avatar
                ? {
                    width: "120px",
                    height: "120px",
                    borderRadius: "0%",
                  }
                : {
                    background: "#fff",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                  }
            }
          >
            {!!user?.avatar && <div className={s.avatarOverlay}></div>}
            <img
              src={user?.avatar ? user?.avatar : "img/common/main-logo.svg"}
              alt="avatar"
              style={
                user?.avatar
                  ? { borderRadius: "50%", width: "120px", height: "120px" }
                  : { borderRadius: "0%", width: "80px", height: "80px" }
              }
            />
          </div>
        </div>
        <div className={s.profilePopUpForm}>
          <div className={s.formName}>
            <label
              htmlFor="name"
              className={`${nameInputActive && s.inputActive} ${s.inputLabels}`}
            >
              <span
                style={
                  nameInputActive
                    ? {
                        position: "relative",
                        top: "0px",
                        fontSize: "14px",
                      }
                    : user?.name && user?.name.length === 0
                    ? {
                        position: "relative",
                        top: "13px",
                        fontSize: "18px",
                      }
                    : {
                        position: "relative",
                        top: "0px",
                        fontSize: "14px",
                      }
                }
              >
                Name
              </span>
              <p>{nameLength}/20</p>
            </label>
            <input
              defaultValue={user?.name || ""}
              onFocus={() => setNameInputActive(true)}
              type="text"
              id="name"
              {...register("name", {
                required: true,
                maxLength: 20,
                pattern: formRegex.name,
                onBlur() {
                  setNameInputActive(false)
                },
              })}
              maxLength={20}
              style={
                errors.name && {
                  border: "2px solid red",
                }
              }
            />
            {errors.name?.type === "required" && (
              <span className={s.errorMessage}>Name is required</span>
            )}
          </div>
          <div className={s.formBio}>
            <label
              htmlFor="bio"
              className={`${bioInputActive && s.inputActive} ${s.inputLabels}`}
            >
              <span
                style={
                  bioInputActive
                    ? {
                        position: "relative",
                        top: "0px",
                        fontSize: "14px",
                      }
                    : user?.bio && user?.bio.length === 0
                    ? {
                        position: "relative",
                        top: "13px",
                        fontSize: "18px",
                      }
                    : {
                        position: "relative",
                        top: "0px",
                        fontSize: "14px",
                      }
                }
              >
                Bio
              </span>
              <p>{bioLength}/100</p>
            </label>
            <textarea
              defaultValue={user?.bio || ""}
              onFocus={() => setBioInputActive(true)}
              id="bio"
              {...register("bio", {
                required: false,
                maxLength: 100,
                onBlur() {
                  setBioInputActive(false)
                },
              })}
              maxLength={100}
              style={
                errors.bio && {
                  border: "2px solid red",
                }
              }
            />
          </div>
          <div className={s.formLocation}>
            <label
              htmlFor="location"
              className={`${locationInputActive && s.inputActive} ${
                s.inputLabels
              }`}
            >
              <span
                style={
                  locationInputActive
                    ? {
                        position: "relative",
                        top: "0px",
                        fontSize: "14px",
                      }
                    : user?.location && user?.location.length === 0
                    ? {
                        position: "relative",
                        top: "13px",
                        fontSize: "18px",
                      }
                    : {
                        position: "relative",
                        top: "0px",
                        fontSize: "14px",
                      }
                }
              >
                Location
              </span>
              <p>{locationLength}/30</p>
            </label>
            <input
              defaultValue={user?.location || ""}
              onFocus={() => setLocationInputActive(true)}
              type="text"
              id="location"
              {...register("location", {
                required: false,
                maxLength: 30,
                onBlur() {
                  setLocationInputActive(false)
                },
              })}
              maxLength={30}
              style={
                errors.location && {
                  border: "2px solid red",
                }
              }
            />
            {errors.location?.type === "pattern" && (
              <span className={s.errorMessage}>Letters required</span>
            )}
          </div>
          <div className={s.formWebsite}>
            <label
              htmlFor="website"
              className={`${websiteInputActive && s.inputActive} ${
                s.inputLabels
              }`}
            >
              <span
                style={
                  websiteInputActive
                    ? {
                        position: "relative",
                        top: "0px",
                        fontSize: "14px",
                      }
                    : user?.website && user?.website.length === 0
                    ? {
                        position: "relative",
                        top: "13px",
                        fontSize: "18px",
                      }
                    : {
                        position: "relative",
                        top: "0px",
                        fontSize: "14px",
                      }
                }
              >
                Website
              </span>
              <p>{websiteLength}/20</p>
            </label>
            <input
              defaultValue={user?.website || ""}
              onFocus={() => setWebsiteInputActive(true)}
              type="text"
              id="website"
              {...register("website", {
                required: false,
                maxLength: 20,
                onBlur() {
                  setWebsiteInputActive(false)
                },
              })}
              maxLength={20}
              style={
                errors.website && {
                  border: "2px solid red",
                }
              }
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProfileEditPopUp
