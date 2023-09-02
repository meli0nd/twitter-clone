import React, { FC, useEffect, useRef, useState } from "react"
import s from "../Profile.module.scss"
import { useForm } from "react-hook-form"
import { formRegex } from "../../../assets/regex"
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store/store"
import { useDispatch } from "react-redux"
import {
  updateUserPopUp,
  updateUserThunk,
} from "../../../Redux/reducers/user-profile"
import PopUpForm from "./PopUpForm"

type TProfilEditPopUp = {
  setProfileEditPopUp: any
}

const ProfileEditPopUp: FC<TProfilEditPopUp> = ({ setProfileEditPopUp }) => {
  const popUpBody = useRef<HTMLDivElement>(null)
  const { user } = useSelector((s: RootState) => s.profileReducer)
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

  const [changedBanner, setChangedBanner] = useState<string | null>(null)
  const [changedAvatar, setChangedAvatar] = useState<string | null>(null)
  const onClickOutSide = (event: any) => {
    if (popUpBody.current && !popUpBody.current.contains(event.target)) {
      setProfileEditPopUp(false)
    }
  }

  const onSubmit = () => {
    const values = getValues()
    const userData = {
      avatar: values.avatar[0],
      banner: values.banner[0],
      name: values.name,
      bio: values.bio || "",
      location: values.location || "",
      website: values.website || "",
    }
    //@ts-ignore
    dispatch(updateUserThunk(userData))
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
  }, [watch, changedBanner])

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
                {...register("banner", {
                  required: false,
                  onChange(event) {
                    setChangedBanner(URL.createObjectURL(event.target.files[0]))
                  },
                })}
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
          <div className={s.profileBannerImage}>
            <img
              src={
                changedBanner
                  ? changedBanner
                  : user?.banner
                  ? user?.banner
                  : "https://pbs.twimg.com/profile_banners/1680124447754272768/1690906783/600x200"
              }
              alt="banner"
            />
          </div>
        </div>
        <div className={s.profileAvatarContainer}>
          <div className={s.profileAvatarBtn}>
            <div>
              <label htmlFor="profileAvatar">
                <img src="img/common/upload.svg" alt="upload" />
              </label>
              <input
                // defaultValue="Choose new avatar"
                type="file"
                id="profileAvatar"
                accept="image/png, image/jpeg"
                {...register("avatar", {
                  required: false,
                  onChange(event) {
                    setChangedAvatar(URL.createObjectURL(event.target.files[0]))
                  },
                })}
              />
            </div>
          </div>
          <div
            className={s.profileAvatar}
            style={
              user?.avatar || changedAvatar
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
              src={
                changedAvatar
                  ? changedAvatar
                  : user?.avatar
                  ? user?.avatar
                  : "img/common/main-logo.svg"
              }
              alt="avatar"
              style={
                user?.avatar || changedAvatar
                  ? { borderRadius: "50%", width: "120px", height: "120px" }
                  : { borderRadius: "0%", width: "80px", height: "80px" }
              }
            />
          </div>
        </div>
        <PopUpForm
          nameInputActive={nameInputActive}
          nameLength={nameLength}
          setNameInputActive={setNameInputActive}
          user={user}
          register={register}
          errors={errors}
          bioInputActive={bioInputActive}
          bioLength={bioLength}
          setBioInputActive={setBioInputActive}
          locationInputActive={locationInputActive}
          locationLength={locationLength}
          setLocationInputActive={setLocationInputActive}
          websiteInputActive={websiteInputActive}
          websiteLength={websiteLength}
          setWebsiteInputActive={setWebsiteInputActive}
        />
      </div>
    </form>
  )
}

export default ProfileEditPopUp
