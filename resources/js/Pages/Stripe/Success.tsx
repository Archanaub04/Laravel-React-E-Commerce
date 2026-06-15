import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Order, PageProps } from "@/types";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";

function Success({ orders }: PageProps<{ orders: Order[] }>) {
  return (
    <AuthenticatedLayout>
      <Head title="Payment Completed" />

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <CheckCircleIcon className="w-24 h-24 text-green-500 mb-4" />
          <h1 className="text-4xl font-bold mb-2">Payment Successful</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Thank you for your purchase! Below is your order summary.
          </p>
        </div>

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Order #{order.id}
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span className="font-medium">Seller</span>
                <Link
                  href="#"
                  className="text-orange-600 hover:underline dark:text-orange-400"
                >
                  {order.vendorUser.store_name}
                </Link>
              </div>

              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span className="font-medium">Items</span>
                <span>{order.orderItems.length}</span>
              </div>

              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span className="font-medium">Total</span>
                <span className="font-bold text-gray-800 dark:text-white">
                  <CurrencyFormatter amount={order.total_price} />
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <Link
                href="#"
                className="btn bg-orange-800 hover:bg-orange-700 text-white rounded-full"
              >
                View Order Details
              </Link>

              <Link
                href={route("dashboard")}
                className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm font-medium rounded-full text-gray-800 dark:text-white transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}

export default Success;
