import ProductItem from "@/Components/App/ProductItem";
import Pagination from "@/Components/Core/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Department, PageProps, PaginatedProducts } from "@/types";
import { Head } from "@inertiajs/react";

function Index({
  appName,
  department,
  products,
}: PageProps<{
  department: Department;
  products: PaginatedProducts;
}>) {
  return (
    <AuthenticatedLayout>
      <Head>
        <title>{department.name}</title>
        <meta name="title" content={department.meta_title} />
        <meta name="description" content={department.meta_description} />
        <link rel="canonical" href={route("product.byDepartment", department.slug)}/>

        <meta property="og:title" content={department.name} />
        <meta property="og:description" content={department.meta_description} />
        <meta
          property="og:url"
          content={route("product.byDepartment", department.slug)}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={appName} />
      </Head>

      <div className="container mx-auto">
        <div className="hero bg-base-200 min-h-[120px]">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">{department.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {products.data.length === 0 && (
        <div className="py-16 px-8 text-center text-black-300 text-3xl">
          No products found
        </div>
      )}

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
    </AuthenticatedLayout>
  );
}
export default Index;
