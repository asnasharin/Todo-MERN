import { Routes, Route  } from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import HomePage from "../pages/HomePage/HomePage"
import Authenticate from "../components/Auth/Authenticate"
import Protect from "../components/Auth/Protect"

function UserRoutes() {
  return (
    <>
    <Routes>
      <Route element={<Authenticate />} >
      <Route path="/signin" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<Protect />}>
      <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
    </>
  )
}

export default UserRoutes