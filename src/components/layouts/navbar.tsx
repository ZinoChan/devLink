import { Link, NavLink } from "react-router";
import { Logo } from "../logo";
import { CircleUserRound, Eye, Link2 } from "lucide-react";
import { LogoMobile } from "../icons/logo-mobile";
import { CHECK_USER } from "@/graphql/user";
import { useQuery } from "@apollo/client";

export default function Navbar() {
  const { data } = useQuery(CHECK_USER);
  return (
    <header className="bg-grey-light h-32 md:p-6">
      <nav className="h-20 flex justify-between items-center w-full ps-6 pe-4  bg-white font-semibold md:rounded-lg">
        <Link to="/dashboard">
          <Logo className="hidden sm:block" />
          <LogoMobile className="sm:hidden" />
        </Link>
        <ul className="flex items-center md:space-x-4 space-x-1">
          <NavLink
            className={({ isActive }) =>
              `rounded-sm capitalize px-6 py-2 text-purple flex space-x-2 items-center justify-center ${isActive ? "bg-purple-light" : ""}`
            }
            to="/dashboard"
          >
            <Link2 className="w-4 h-4" />
            <span className="hidden sm:block">Link</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `rounded-sm capitalize px-6 py-2 text-purple flex space-x-2 items-center justify-center ${isActive ? "bg-purple-light" : ""}`
            }
            to="/profile"
          >
            <CircleUserRound className="w-4 h-4" />
            <span className="hidden sm:block">profile details</span>
          </NavLink>
        </ul>
        <div className="flex items-center">
          {data?.users[0]?.id && (
            <Link
              className="text-purple border-purple py-2 px-4 sm:px-6 flex items-center justify-center border rounded md:w-auto lg:transition-colors lg:hover:bg-light-purple"
              to={`/preview/${data?.users[0]?.id}`}
            >
              <Eye className="sm:hidden w-4 h-4" />
              <span className="hidden sm:block">Preview</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
