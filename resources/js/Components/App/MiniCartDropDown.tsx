import React from "react";
import { Link, usePage } from "@inertiajs/react";
import CurrencyFormatter from "../Core/CurrencyFormatter";
import { ProductRoute } from "@/helpers";

function MiniCartDropDown() {
  const { totalQuantity, totalPrice, miniCartItems } = usePage().props;
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
            <span className="badge badge-sm indicator-item bg-orange-800 text-white">
              {totalQuantity}
            </span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-[480px] shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">{totalQuantity} Items</span>

            <div className="my-1 max-h-[300px] overflow-auto">
              {miniCartItems.length === 0 && (
                <div className={"py-2 text-gray-500 text-center"}>
                  You don't have any items yet.
                </div>
              )}

              {miniCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 border-b items-start"
                >
                  <Link href={ProductRoute(item)}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded"
                    />
                  </Link>

                  <div className="flex flex-col flex-1">
                    <h3 className="font-semibold text-sm mb-1">
                      <Link href={ProductRoute(item)}>
                        {item.title}
                      </Link>
                    </h3>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Quantity: {item.quantity}</span>
                      <span>
                        <CurrencyFormatter
                          amount={item.quantity * item.price}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <span className="text-lg font-semibold">
              Subtotal: <CurrencyFormatter amount={totalPrice} />
            </span>
            <div className="card-actions">
              <Link
                href={route("cart.index")}
                className="btn bg-orange-800 text-white hover:bg-orange-700 btn-block"
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
