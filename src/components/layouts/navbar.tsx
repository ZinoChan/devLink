import { Link, NavLink } from "react-router";
import { Logo } from "../logo";
import { CircleUserRound, Link2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-grey-light h-32 md:p-6">
      <nav className="h-20 flex justify-between items-center w-full ps-6 pe-4  bg-white font-semibold md:rounded-lg">
        <Link to="/dashboard">
          <div className="hidden md:block md:w-[146px]">
            <Logo />
          </div>
        </Link>
        <ul className="flex items-center space-x-4">
          <NavLink
            className={({ isActive }) =>
              `rounded-sm capitalize px-6 py-2 text-purple flex space-x-2 items-center justify-center ${isActive ? "bg-purple-light" : ""}`
            }
            to="/dashboard"
          >
            <Link2 className="w-4 h-4 mr-2" />
            Link
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `rounded-sm capitalize px-6 py-2 text-purple flex space-x-2 items-center justify-center ${isActive ? "bg-purple-light" : ""}`
            }
            to="/profile"
          >
            <CircleUserRound className="w-4 h-4 mr-2" />
            profile details
          </NavLink>
        </ul>
        <div className="flex items-center">
          <Link
            className="text-purple border-purple h-[42px] flex items-center justify-center w-[52px] border rounded md:w-auto md:px-[27px] md:h-[46px] lg:transition-colors lg:hover:bg-light-purple"
            to="/preview"
          >
            Preview
          </Link>
        </div>
      </nav>
    </header>
  );
}
