import React, { useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";

type MobileMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  user: any;
  closeMenu: () => void;
};

export default function MobileMenu({
  isMenuOpen,
  toggleMenu,
  user,
  closeMenu,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="lg:hidden text-gray-600 hover:text-gray-900"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <ul
          ref={menuRef}
          className="absolute top-16 left-0 z-40 w-52 bg-white border rounded-md shadow-lg p-2 space-y-2"
        >
          <li>
            <Link
              href={route("dashboard")}
              className="block px-3 py-1 text-sm hover:text-orange-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={route("shop")}
              className="block px-3 py-1 text-sm hover:text-orange-600"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block px-3 py-1 text-sm hover:text-orange-600"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block px-3 py-1 text-sm hover:text-orange-600"
            >
              Contact
            </Link>
          </li>

          {!user && (
            <li className="flex flex-col space-y-2 border-t border-gray-200 pt-2">
              <Link
                href={route("login")}
                className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-md"
              >
                Log in
              </Link>
              <Link
                href={route("register")}
                className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-md"
              >
                Register
              </Link>
            </li>
          )}
        </ul>
      )}
    </>
  );
}
