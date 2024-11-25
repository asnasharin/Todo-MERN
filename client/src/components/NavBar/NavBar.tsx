import { Dispatch, SetStateAction } from "react";
import Logo from "../../assets/Logo.svg";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import TableRowsIcon from "@mui/icons-material/TableRows";

type prop = {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
};
export default function NavBar({ setOpenDrawer }: prop) {
  return (
    <div className="w-full border-b-2 border-gray-100 dark:border-gray-900  fixed backdrop-blur-sm top-0 bg-slate-100/[0.2] z-50 px-3 dark:bg-black/[0.2] h-16 flex justify-between items-center">
      <div className="flex  items-center gap-2">
        <img src={Logo} className="max-w-fit" alt="" />
        <h1 className="font-black text-gray-900 dark:text-gray-100 text-2xl">
          TodoPro
        </h1>
      </div>
      <div className="flex items-center">
        <ThemeToggleButton />
        <span
          onClick={() => setOpenDrawer(true)}
          className="dark:text-white cursor-pointer inline-block md:hidden"
        >
          <TableRowsIcon fontSize="large" />
        </span>
      </div>
    </div>
  );
}
