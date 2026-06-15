import PrimaryButton from "@/Components/Core/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import React, { FormEventHandler, useState } from "react";
import SecondaryButton from "@/Components/Core/SecondaryButton";
import Modal from "@/Components/Core/Modal";
import InputLabel from "@/Components/Core/InputLabel";
import TextInput from "@/Components/Core/TextInput";
import InputError from "@/Components/Core/InputError";

function VendorDetails({ className = "" }: { className?: string }) {
  const [showBecomeVendorConfirmation, setShowBecomeVendorConfirmation] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const user = usePage().props.auth.user;
  const token = usePage().props.csrf_token;

  const { data, setData, errors, post, processing, recentlySuccessful } =
    useForm({
      store_name:
        user.vendor?.store_name || user.name.toLowerCase().replace(/\s+/g, "-"),
      store_address: user.vendor?.store_address || "",
    });

  // store_name change
  const onStoreNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      "store_name",
      event.target.value.toLowerCase().replace(/\s+/g, "-")
    );
  };

  //  become vendor submit details when vbecome vendor button clicks
  const becomeVendor: FormEventHandler = (event) => {
    event.preventDefault();

    post(route("vendor.store"), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
        setSuccessMessage("You can now create and publish products.");
      },
      onError: () => {},
    });
  };

  // vendor details updates
  const updateVendor: FormEventHandler = (event) => {
    event.preventDefault();

    post(route("vendor.store"), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
        setSuccessMessage("Your details were updated.");
      },
      onError: () => {},
    });
  };

  const closeModal = () => {
    setShowBecomeVendorConfirmation(false);
  };

  return (
    <section className={className}>
      {recentlySuccessful && (
        <div className="toast toast-top toast-end z-[1000]">
          <div className="alert alert-success text-white">
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <header>
        <h2 className="flex justify-between mb-8 text-lg font-medium text-gray-900 dark:text-gray-100">
          Vendor Details
          {/* look up objects - it maps the key value pais - it reduces the if switch statements */}
          {user.vendor?.status && (
            <span
              className={`badge text-white ${
                {
                  pending: "badge-warning",
                  rejected: "badge-error",
                  approved: "badge-success",
                }[user.vendor.status] || ""
              }`}
            >
              {user.vendor.status_label}
            </span>
          )}
        </h2>
      </header>

      <div>
        {!user.vendor && (
          <PrimaryButton
            onClick={(event) => setShowBecomeVendorConfirmation(true)}
            disabled={processing}
          >
            Become a Vendor
          </PrimaryButton>
        )}

        {user.vendor && (
          <>
            {/* update vendor details - form */}
            <form onSubmit={updateVendor}>
              <div className="mb-4">
                <InputLabel htmlFor="name" value="Store Name" />

                <TextInput
                  id="store_name"
                  value={data.store_name}
                  onChange={onStoreNameChange}
                  required
                  isFocused
                  autoComplete="store_name"
                  className="mt-1 block w-full"
                />

                <InputError className="mt-2" message={errors.store_name} />
              </div>

              <div className="mb-4">
                <InputLabel htmlFor="name" value="Store Address" />

                <textarea
                  value={data.store_address}
                  onChange={(event) =>
                    setData("store_address", event.target.value)
                  }
                  className="textarea textarea-bordered w-full mt-1 focus:border-orange-900 focus:ring-1 focus:ring-orange-900 dark:focus:border-orange-600 dark:focus:ring-1 dark:focus:ring-orange-600 focus:outline-none transition-all duration-200 ease-in-out"
                  placeholder="Enter Your Store Address"
                ></textarea>

                <InputError className="mt-2" message={errors.store_address} />
              </div>

              <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Update</PrimaryButton>
              </div>
            </form>

            {/* connect to stripe - stripe connect */}
            <form
              action={route("stripe.connect")}
              method="post"
              className="my-8"
            >
              <input type="hidden" name="_token" value={token} />

              {user.stripe_account_active && (
                <div className="text-center text-gray-600 my-4 text-sm">
                  Yor are successfully connected to Stripe
                </div>
              )}

              <div className="w-full">
                <PrimaryButton
                  className="w-full justify-center"
                  disabled={user.stripe_account_active}
                >
                  Connect to Stripe
                </PrimaryButton>
              </div>
            </form>
          </>
        )}
      </div>

      <Modal show={showBecomeVendorConfirmation} onClose={closeModal}>
        <form onSubmit={becomeVendor} className="p-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Are you sure you want to become a Vendor?
          </h2>

          <div className="mt-6 flex justify-end space-x-3">
            <SecondaryButton onClick={closeModal} className="normal-case">
              Cancel
            </SecondaryButton>
            <PrimaryButton disabled={processing} className="normal-case">
              Confirm
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}

export default VendorDetails;
