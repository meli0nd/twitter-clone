import React, { FC } from "react"
import "./App.scss"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Infobar from "./components/Infobar/Infobar"
import { Route, Routes } from "react-router-dom"
import Muting from "./pages/Muting"
import Explore from "./pages/Explore/Explore"
import Messages from "./pages/Messages/Messages"
import Bookmarks from "./pages/Bookmarks/Bookmarks"
import Profile from "./pages/Profile/Profile"
import SignIn from "./pages/Auth/SignIn/SignIn"
import SignUp from "./pages/Auth/SignUp/SignUp"

const App: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
