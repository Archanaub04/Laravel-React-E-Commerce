import CartItem from "@/Components/App/CartItem";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { GroupedCartItems, PageProps } from "@/types";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";

function Index({
  csrf_token,
  cartItems,
  totalQuantity,
  totalPrice,
}: PageProps<{ cartItems: Record<number, GroupedCartItems> }>) {
  return (
    <AuthenticatedLayout>
      <Head title="Your Cart" />
      <div className="container max-auto p-8 flex flex-col lg:flex-row gap-4">
        <div className="card flex-1 bg-white dark:bg-gray-800 order-2 lg:order-1">
          {/* left area - product*/}
          <div className="card-body">
            <h2 className="text-lg font-bold">Shopping Cart</h2>

            <div className="my-4">
              {Object.keys(cartItems).length === 0 && (
                <div className="py-2 text-gray-500 text-center">
                  You don't have any items yet.
                </div>
              )}

              {/* <pre>{JSON.stringify(cartItems, undefined, 10)}</pre> */}

              {Object.values(cartItems).map((cartItem) => (
                <div key={cartItem.user.id}>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-4">
                    <Link href="/" className="underline">
                      {cartItem.user.name}
                    </Link>

                    <div>
                      <form action={route("cart.checkout")} method="post">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input
                          type="hidden"
                          name="vendor_id"
                          value={cartItem.user.id}
                        />
                        <button className="btn btn-sm btn-ghost">
                          <CreditCardIcon className="size-6" />
                          Pay Only for this seller
                        </button>
                      </form>
                    </div>
                  </div>

                  <div key={cartItem.user.id} className="mb-6">
                    <div className="flex flex-col gap-4 w-full pb-4 border-b border-gray-300 mb-4">
                      {cartItem.items.map((item) => (
                        <CartItem item={item} key={item.id} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right - total */}
        <div className="card bg-white dark:bg-gray-800 lg:min-w-[260px] order-1 lg:order-2">
          <div className="card-body">
            <span>Subtotal ({totalQuantity} items): &nbsp;</span>
            <CurrencyFormatter amount={totalPrice} />
            <form action={route("cart.checkout")} method="post">
              <input type="hidden" name="_token" value={csrf_token} />

              <PrimaryButton className="rounded-full">
                <CreditCardIcon className="size-6 pr-2" />
                Proceed to checkout
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
export default Index;
