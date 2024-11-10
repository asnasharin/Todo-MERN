import { Routes, Route  } from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import HomePage from "../pages/HomePage/HomePage"

function UserRoutes() {
  return (
    <>
    <Routes>
      <Route path="/signin" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
    </>
  )
}

export default UserRoutes