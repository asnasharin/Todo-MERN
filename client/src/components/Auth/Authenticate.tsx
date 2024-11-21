import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Authenticate() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") as string);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return <>{!user ? <Outlet /> : null}</>;
}
