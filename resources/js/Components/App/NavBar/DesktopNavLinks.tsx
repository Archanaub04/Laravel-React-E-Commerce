import React from "react";
import { Link } from "@inertiajs/react";

export default function DesktopNavLinks() {
  const links = [
    { name: "Home", routeName: "dashboard" },
    { name: "Shop", routeName: "shop" },
    { name: "About", routeName: "about" },
    { name: "Contact", routeName: "contact" },
  ];

  return (
    <div className="hidden lg:flex lg:space-x-6 justify-center flex-1">
      {links.map(({ name, routeName }) => (
        <Link
          key={routeName}
          href={route(routeName)}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600"
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
