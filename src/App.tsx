import React, { FC, useEffect } from "react"
import "./App.scss"
import Home from "./pages/Home/Home"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Muting from "./pages/Muting"
import Explore from "./pages/Explore/Explore"
import Messages from "./pages/Messages/Messages"
import Bookmarks from "./pages/Bookmarks/Bookmarks"
import Profile from "./pages/Profile/Profile"
import SignIn from "./pages/Auth/SignIn/SignIn"
import SignUp from "./pages/Auth/SignUp/SignUp"
import Users from "./pages/Users/Users"
import SignUpEmail from "./pages/Auth/SignUp/SignUpEmail/SignUpEmail"
import Navbar from "./components/Navbar/Navbar"
import { useSelector } from "react-redux"
import { RootState } from "./Redux/store/store"
import Loader from "./components/Loader/Loader"

const App: FC = () => {
  const location = useLocation()
  const hideNavbar = location.pathname.includes("auth")
  const { creatingAccountLoading, loginLoading } = useSelector(
    (s: RootState) => s.authReducer
  )
  const { profileLoading } = useSelector((s: RootState) => s.profileReducer)
  const { isLoadingUsers } = useSelector((s: RootState) => s.usersReducer)

  if (creatingAccountLoading) {
    return (
      <div>
        <Loader title="Creating account..." />
      </div>
    )
  } else if (loginLoading) {
    return (
      <div>
        <Loader title="Loading sign in..." />
      </div>
    )
  } else if (profileLoading) {
    return (
      <div>
        <Loader title="Loading profile..." />
      </div>
    )
  } else if (isLoadingUsers) {
    return (
      <div>
        <Loader title="Loading users..." />
      </div>
    )
  }

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/users" element={<Users />} />
        <Route path="/:id/*" element={<Profile />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signup/email" element={<SignUpEmail />} />
        <Route path="*" element={<Muting />} />
      </Routes>
    </div>
  )
}

export default App
