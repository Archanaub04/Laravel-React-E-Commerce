import React from "react";
import { Link } from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/Core/ResponsiveNavLink";

type AuthSectionProps = {
  user: any;
};

export default function AuthSection({ user }: AuthSectionProps) {
  if (user) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-8 rounded-full ring ring-orange-600 ring-offset-1">
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
        >
          <li>
            <ResponsiveNavLink
              href={route("profile.edit")}
              className="justify-between"
            >
              Profile
            </ResponsiveNavLink>
          </li>
          <li>
            <ResponsiveNavLink href="">Settings</ResponsiveNavLink>
          </li>
          <li>
            <ResponsiveNavLink method="post" href={route("logout")} as="button">
              Log Out
            </ResponsiveNavLink>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex lg:items-center lg:space-x-3">
      <Link
        href={route("login")}
        className="btn btn-ghost btn-sm rounded-lg hover:bg-orange-700 hover:text-white"
      >
        Log in
      </Link>
      <Link
        href={route("register")}
        className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-md"
      >
        Register
      </Link>
    </div>
  );
}
