import React, { FormEventHandler } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePage, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function SearchBar() {
  const { keyword } = usePage().props;

  const searchForm = useForm<{ keyword: string }>({
    keyword: keyword || "",
  });

  const { url } = usePage();

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    searchForm.get(url);
  };

  return (
    <div className="hidden lg:block max-w-md w-full">
      <form onSubmit={onSubmit} className="flex">
        <input
          type="text"
          value={searchForm.data.keyword}
          onChange={(e) => searchForm.setData("keyword", e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-purple-500 focus:border-purple-500 text-sm"
          placeholder="Search products..."
        />
        <button
          type="submit"
          className="px-3 py-2 bg-purple-600 text-white border border-l-0 border-purple-600 rounded-r-md hover:bg-purple-700 text-sm"
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
