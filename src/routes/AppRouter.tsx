import type React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home/Home"

export const AppRouter:React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
    </Routes>

)
}
