import React, { FC } from "react"
import s from "./Loader.module.scss"

type TLoader = {
  title: string
}

const Loader: FC<TLoader> = ({ title }) => {
  return (
    <div className={s.loader}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          background: "none",
          display: "block",
          shapeRendering: "auto",
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#1da1f2"
          strokeWidth="11"
          r="42"
          strokeDasharray="197.92033717615698 67.97344572538566"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.4854368932038836s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
      <span>{title}</span>
    </div>
  )
}

export default Loader
