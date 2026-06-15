import ProductItem from "@/Components/App/ProductItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PaginationProps, Product } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Home({
  products,
}: PageProps<{
  products: PaginationProps<Product>;
}>) {
  return (
    <AuthenticatedLayout>
      <Head title="Home" />
      <div className="hero bg-orange-200 h-[300px]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to E-Commerce Core 2</h1>
            <p className="py-6">
              Get 50% off on your first purchase! Explore our wide range of
              products and enjoy exclusive deals.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
        {products.data.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
