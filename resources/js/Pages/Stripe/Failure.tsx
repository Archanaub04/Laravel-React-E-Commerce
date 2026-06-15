import PrimaryButton from "@/Components/Core/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";

export default function Failure() {
  return (
    <AuthenticatedLayout>
      <Head title="Payment Failed" />

      <div className="w-[480px] mx-auto py-12">
        <div className="flex flex-col items-center">
          <div className="text-red-600">
            <XCircleIcon className="size-24" />
          </div>
          <div className="text-3xl font-semibold mt-4">Payment Failed</div>
          <p className="text-gray-600 mt-2 text-center">
            Something went wrong during your payment process. Your payment was
            not completed.
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">What you can do</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Ensure your card details are correct.</li>
            <li>Try using a different payment method.</li>
            <li>Contact your bank if the issue persists.</li>
          </ul>

          <div className="flex justify-between mt-6">
            <Link
              href={route("shop")}
              className="btn bg-orange-800 hover:bg-orange-700 text-white rounded-full"
            >
              Back to Shop
            </Link>
            <Link
              href={route("dashboard")}
              className="btn btn-outline rounded-full"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
