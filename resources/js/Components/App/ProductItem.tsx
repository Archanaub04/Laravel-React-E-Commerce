import React, { useState } from "react";
import { Product } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FaCartPlus } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Eye } from "lucide-react";
import CurrencyFormatter from "../Core/CurrencyFormatter";

function ProductItem({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  const form = useForm({
    option_ids: {},
    quantity: 1,
  });

  const addToCart = () => {
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err) => console.log(err),
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group relative">
      <figure className="relative group aspect-[4/3] w-full overflow-hidden">
        <Link href={route("product.show", product.slug)}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={toggleWishlist}
            title="Wishlist"
            className="bg-white p-2 rounded-full shadow hover:bg-rose-100"
          >
            {wishlisted ? (
              <AiFillHeart className="text-red-500 w-5 h-5" />
            ) : (
              <AiOutlineHeart className="text-gray-600 w-5 h-5" />
            )}
          </button>
          <button
            onClick={addToCart}
            title="Add to Cart"
            className="bg-white p-2 rounded-full shadow hover:bg-orange-100"
          >
            <FaCartPlus className="text-gray-600 w-5 h-5" />
          </button>
          <Link
            href={route("product.show", product.slug)}
            title="Quick View"
            className="bg-white p-2 rounded-full shadow hover:bg-cyan-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="text-gray-600 w-5 h-5" />
          </Link>
        </div>
      </figure>

      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-gray-800 hover:text-orange-600">
          <Link href={route("product.show", product.slug)}>
            {product.title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href={route("product.byDepartment", product.department.slug)}>
            <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
              {product.department.name}
            </span>
          </Link>
          <span className="bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-full">
            {product.category.name}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description ||
            "High-quality product crafted with modern design for your needs."}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <span className="text-lg font-bold text-orange-600">
            <CurrencyFormatter amount={product.price} />
          </span>
          {/* {product.price + 20 > product.price && (
            <span className="text-xs text-gray-500 line-through">
              <CurrencyFormatter amount={product.price + 20} />
            </span>
          )} */}
        </div>

        {/* ✅ Ratings and Review Count */}
        {/* <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <span>★ 4.5</span>
          <span className="text-gray-400">(120 reviews)</span>
        </div> */}

        {/* ✅ Vendor Link */}
        {product.user.store_name && (
          <div className="pt-1 text-sm">
            <span className="text-gray-500">From </span>
            <Link
              href={route("vendor.profile", product.user.store_name)}
              className="text-orange-600 hover:underline"
            >
              {product.user.name}
            </Link>
          </div>
        )}
      </div>

      {/* ✅ Badge Example */}
      {/* <div className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
        Bestseller
      </div> */}
    </div>
  );
}

export default ProductItem;
