import React, { FC } from "react"
import s from "../Profile.module.scss"
import { formRegex } from "../../../assets/regex"
import { FieldErrors } from "react-hook-form"
import { TUser } from "../../../Redux/reducers/user-profile"

type TPopUpForm = {
  nameInputActive: boolean
  nameLength: number
  setNameInputActive: (bool: boolean) => void
  user: TUser | null
  register: any
  errors: FieldErrors
  bioInputActive: boolean
  bioLength: number
  setBioInputActive: (bool: boolean) => void
  locationInputActive: boolean
  locationLength: number
  setLocationInputActive: (bool: boolean) => void
  websiteInputActive: boolean
  websiteLength: number
  setWebsiteInputActive: (bool: boolean) => void
}

const PopUpForm: FC<TPopUpForm> = ({
  nameInputActive,
  nameLength,
  setNameInputActive,
  user,
  register,
  errors,
  bioInputActive,
  bioLength,
  setBioInputActive,
  locationInputActive,
  locationLength,
  setLocationInputActive,
  websiteInputActive,
  websiteLength,
  setWebsiteInputActive,
}) => {
  return (
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
          className={`${locationInputActive && s.inputActive} ${s.inputLabels}`}
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
          className={`${websiteInputActive && s.inputActive} ${s.inputLabels}`}
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
  )
}

export default PopUpForm
