import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./userInfor.css";

export default function UserInfo() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const nvaigate = useNavigate();
  return (
    <div className="w-full logout relative hover:bg-gray-400/[0.2] hover:dark:bg-slate-800 flex gap-3 ps-4 items-center h-16 text-gray-800 dark:text-white">
      <div className="absolute log-btn right-3 hidden">
        <button
          onClick={() => {
            dispatch(logout());
            nvaigate("/login");
          }}
          className="bg-red-600 text-gray-200 px-3 rounded-md font-medium py-1"
        >
          Logout
        </button>
      </div>
      {user?.profile ? (
        <>
          <img className="rounded-full h-12" src={user.profile} alt="" />
        </>
      ) : (
        <>
          <div className="rounded-full grid justify-center items-center bg-gray-400 h-12 w-12 dark:bg-slate-500">
            <h1 className="text-3xl font-bold">{user?.name.slice(0, 1)}</h1>
          </div>
        </>
      )}
      <div className="flex flex-col">
        <h1 className="font-medium">{user?.name}</h1>
        <small>{user?.email}</small>
      </div>
    </div>
  );
}
