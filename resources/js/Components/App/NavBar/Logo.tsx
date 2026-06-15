import React from "react";
import { Link } from "@inertiajs/react";

export default function Logo() {
  return (
    <Link href="/" className="flex-shrink-0">
      <img
        src="/images/logo-ecommerce-removebg.jpg"
        alt="{{config('app.name')}}"
        className="h-8 w-auto"
      />
    </Link>
  );
}
