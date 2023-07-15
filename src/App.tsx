import React, { FC } from "react"
import "./App.scss"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Infobar from "./components/Infobar/Infobar"

const App: FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Infobar />
    </div>
  )
}

export default App
