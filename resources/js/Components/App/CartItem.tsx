import React, { useCallback, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { cartItems as CartItemType } from "@/types";
import { ProductRoute } from "@/helpers";
import TextInput from "../Core/TextInput";
import CurrencyFormatter from "../Core/CurrencyFormatter";
import { debounce } from "lodash";

function CartItem({ item }: { item: CartItemType }) {
  const deleteForm = useForm({
    option_ids: item.option_ids,
  });

  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(item.quantity);

  const onDeleteClick = () => {
    deleteForm.delete(route("cart.destroy", item.product_id), {
      preserveScroll: true,
    });
  };

  const debouncedUpdateQuantity = useCallback(
    debounce((newQty: number) => {
      router.put(
        route("cart.update", item.product_id),
        {
          quantity: newQty,
          option_ids: item.option_ids,
        },
        {
          preserveScroll: true,
          onError: (errors) => {
            if (errors.quantity) {
              setError(Object.values(errors.quantity)[0]);
            }
          },
        }
      );
    }, 700), // Wait 700ms after user stops changing
    []
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Number(e.target.value);
    setError("");
    setQuantity(newQty);
    debouncedUpdateQuantity(newQty); // trigger debounced backend call
  };

  return (
    <>
      <div
        key={item.id}
        // className="flex items-start gap-6 p-4 w-full border-b"
        className="flex flex-col md:flex-row items-start gap-6 p-6 w-full bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition"
      >
        {/* Image */}
        <Link
          href={ProductRoute(item)}
          className="w-full md:w-32 h-32 flex justify-center items-center bg-gray-50 border rounded-lg overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            className="max-w-full max-h-full object-contain transition-transform duration-200 hover:scale-105"
          />
        </Link>

        {/* Product Info */}
        <div className="flex flex-col justify-between flex-1 w-full">
          {/* Title + Options */}
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:underline">
              <Link href={ProductRoute(item)}>{item.title}</Link>
            </h3>

            <div className="text-sm text-gray-600 space-y-1">
              {item.options.map((option) => (
                <div key={option.id}>
                  <span className="font-bold">{option.type.name}:</span>
                  {"  "}
                  <span className="">{option.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity + Actions  + Price */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-5 gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-sm font-medium">Qty:</div>
              <div
                className={error ? "tooltip tooltip-open tooltip-error" : ""}
                data-tip={error}
              >
                <TextInput
                  type="number"
                  defaultValue={quantity}
                  // onBlur={handleQuantityChange}
                  onChange={handleQuantityChange}
                  className="input-sm w-16"
                />
              </div>

              <button
                onClick={() => onDeleteClick()}
                className="btn btn-sm btn-ghost text-red-500"
              >
                Delete
              </button>

              <button className="btn btn-sm btn-ghost text-orange-600">
                Save for Later
              </button>
            </div>

            <div className="text-lg font-bold text-gray-800 min-w-max">
              <CurrencyFormatter amount={item.price * item.quantity} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CartItem;
