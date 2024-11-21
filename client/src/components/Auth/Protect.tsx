import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

export default function Protect() {
  const { user } = useAppSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const isAuth = token && user;

  return <>{isAuth ? <Outlet /> : <Navigate to="/signin" />}</>;
}
