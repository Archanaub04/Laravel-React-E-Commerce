import React from "react";
import { Link, usePage } from "@inertiajs/react";
import CurrencyFormatter from "../Core/CurrencyFormatter";

function MiniCartDropDown() {
  const { totalQuantity, totalPrice, cartItems } = usePage().props;
  return (
    <div>
      {/* Cart dropdown */}
      <div className="dropdown dropdown-end mr-5">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item bg-violet-800 text-white">
              {totalQuantity}
            </span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">{totalQuantity} Items</span>
            <span className="text-info">
              Subtotal: <CurrencyFormatter amount={totalPrice} />
            </span>
            <div className="card-actions">
              <Link
                href={route("cart.index")}
                className="btn btn-primary btn-block"
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniCartDropDown;
