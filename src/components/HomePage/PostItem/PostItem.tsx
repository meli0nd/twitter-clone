import React from "react"
import s from "./PostItem.module.scss"

const PostItem = () => {
  return (
    <div className={s.postItemContainer}>
      <div className={s.postItemUserAvatar}>
        <img
          src="http://zbs-sticker.by/stories/images/prod/3862x0ccc-300x220.png"
          alt=""
        />
      </div>
      <div className={s.postItemInfo}>
        <div className={s.postItemUserInfo}>
          <h1>Meliond</h1>
          <span>@meliond · </span>
          <span>25m</span>
        </div>
        <div className={s.postItemBody}>
          <span>
            Twitterdagi ayol-erkak qarama-qarshiliginglardan o'zinglar
            zerikmadinglarmi?Twitterdagi ayol-erkak qarama-qarshiliginglardan
            o'zinglar zerikmadinglarmi?Twitterdagi ayol-erkak
            qarama-qarshiliginglardan o'zinglar zerikmadinglarmi?
          </span>
          <img
            src="http://vsegda-pomnim.com/uploads/posts/2022-04/1650934307_29-vsegda-pomnim-com-p-gori-kanadi-foto-37.jpg"
            alt="post-image"
          />
        </div>
        <div className={s.postItemOptions}>
          <div className={s.postItemComments}>
            <img src="img/postItem/comment.svg" alt="comment" />
            <span>100</span>
          </div>
          <div className={s.postItemLikes}>
            <img src="img/postItem/like.svg" alt="like" />
            <span>100</span>
          </div>
        </div>
      </div>
      <div className={s.postItemMore}>
        <img src="img/infobar/trendslist-icon.svg" alt="more" />
      </div>
    </div>
  )
}

export default PostItem
