import React, { FC } from "react"
import s from "./Message.module.scss"

type TMessage = {
  title: string
  success?: boolean
}

const Message: FC<TMessage> = ({ title, success }) => {
  return (
    <div
      className={success ? s.successMessageContainer : s.errorMessageContainer}
    >
      <span>{title}</span>
    </div>
  )
}

export default Message
