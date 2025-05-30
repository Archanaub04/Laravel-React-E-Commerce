import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PaginatedProducts, Vendor } from "@/types";
import { Head } from "@inertiajs/react";
import ProductItem from "@/Components/App/ProductItem";
import Pagination from "@/Components/Core/Pagination";

function Profile({
  vendor,
  products,
}: PageProps<{
  vendor: Vendor;
  products: PaginatedProducts;
}>) {
  return (
    <AuthenticatedLayout>
      <Head title={vendor.store_name + " Profile Page"} />

      <div
        className="hero min-h-[320px]"
        style={{
          backgroundImage:
            "url(https://20.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{vendor.store_name}</h1>
          </div>
        </div>
      </div>

      {products.data.length > 0 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 p-8">
            {products.data.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
          <Pagination
            links={products.links}
            currentPage={products.meta.current_page}
            lastPage={products.meta.last_page}
          />
        </div>
      ) : (
        <div className="bg-white p-8 text-center rounded shadow">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
export default Profile;
