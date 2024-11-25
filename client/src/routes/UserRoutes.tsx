import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader1 from "../components/Loader/Loader1/Loader1";
import Authenticate from "../components/Auth/Authenticate";
import Protect from "../components/Auth/Protect";
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage/SignupPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

export default function UserRoutes() {
  return (
    <>
      <Suspense fallback={<Loader1 />}>
        <Routes>
          <Route element={<Authenticate />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<Protect />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
