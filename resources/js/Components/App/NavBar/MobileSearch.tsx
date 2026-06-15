import React, { useState, FormEventHandler } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePage, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function MobileSearch() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { keyword } = usePage().props;
  const searchForm = useForm<{ keyword: string }>({
    keyword: keyword || "",
  });

  const { url } = usePage();

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    searchForm.get(url, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <>
      <button
        className="lg:hidden text-gray-600 hover:text-gray-900"
        onClick={() => setIsMobileSearchOpen((prev) => !prev)}
        aria-label="Toggle mobile search"
      >
        {isMobileSearchOpen ? (
          <XMarkIcon className="h-5 w-5" />
        ) : (
          <MagnifyingGlassIcon className="h-5 w-5" />
        )}
      </button>

      {isMobileSearchOpen && (
        <form
          onSubmit={onSubmit}
          className="absolute top-16 left-0 right-0 z-40 bg-white px-4 py-2 shadow-md flex items-center space-x-2"
        >
          <input
            type="text"
            autoFocus
            value={searchForm.data.keyword}
            onChange={(e) => searchForm.setData("keyword", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm"
            placeholder="Search products..."
          />
          <button
            type="submit"
            className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
        </form>
      )}
    </>
  );
}
