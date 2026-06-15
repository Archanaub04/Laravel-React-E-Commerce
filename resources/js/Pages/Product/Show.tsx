import Carousel from "@/Components/Core/Carousel";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import { arraysAreEqual } from "@/helpers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Product, VariationTypeOption } from "@/types";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { FaCartPlus } from "react-icons/fa6";

function Show({
  appName,
  product,
  variationOptions,
}: PageProps<{
  product: Product;
  variationOptions: number[];
}>) {
  const form = useForm<{
    option_ids: Record<string, number>;
    quantity: number;
    price: number | null;
  }>({
    option_ids: {},
    quantity: 1,
    price: null, // to populate based or selected variation or if no variation, then product price
  });

  // url change to also include selected variation combination datas
  const { url } = usePage();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, VariationTypeOption>
  >([]);

  /* ------------ OPTION IMAGE COMPUTE BASED ON SELECTION --------------------------- */

  /* this is the selected option format
    {
      variant type id : variant type option object
      "1": {
      "id": 1,
      "name": "black",
      "images"
      }
    }
  */

  // images get for the selected variant or if no combination, default product images memorize it
  // take the first variant's image . not the combination image. there is no combination image

  const images = useMemo(() => {
    //  typeId is key of the selectedOptions
    for (let typeId in selectedOptions) {
      const option = selectedOptions[typeId];

      if (option.images.length > 0) return option.images;
    }
    return product.images;
  }, [product, selectedOptions]);

  /* --------------------------------------------------------------------------- */
  /* --------- PRODUCT PRICE & QUANTITY BASED ON VARIANT COMBINATION ----------- */

  const computedProduct = useMemo(() => {
    // extracting only ids from selectedOptions
    /*
    {
      variant type id : variant type option object
      "1": {
      "id": 1,
      "name": "black",
      "images"
      },
      "2": {
      "id": 2,
      "name": "small",
      "images"
      }
    }
    to [1,2] and sort it to ascending order if  [2,1] to [1,2]
    */
    const selectedOptionIds = Object.values(selectedOptions)
      .map((option) => option.id)
      .sort();

    // variant combination option id
    for (let variation of product.variations) {
      const optionIds = variation.variation_type_option_ids.sort();
      // match selectedoptionIds with the each variant combination ids to get its data
      if (arraysAreEqual(selectedOptionIds, optionIds)) {
        return {
          price: variation.price,
          // if no quantity (only if null not 0) means, unlimited stock
          quantity:
            variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
        };
      }
    }
    return {
      price: product.price,
      quantity: product.quantity,
    };
  }, [product, selectedOptions]);
  /* ----------------------------------------------------------------------------- */

  /* ------------------------------- useeffect ---------------------------------- */

  // to display he pre-selected options from the url when share the url with selected options--

  useEffect(() => {
    // check the variation type and options with the selected options

    // variationOptions means the option variant combinations selected by user and apeared on url that is actually passing from controller to this view as variantOptions
    for (let type of product.variationTypes) {
      // if empty it will be null, then pass the first option

      const selectedOptionId = variationOptions[type.id];

      // variation type id, selected option id is checking with original options, need to display in url or not
      // in use effect first time loading so no need
      chooseOption(
        type.id,
        type.options.find((op) => op.id == selectedOptionId) || type.options[0],
        false
      );
    }
  }, []);
  /* ----------------------------------------------------------------------------- */
  /* ----------------------------------------------------------------------------- */

  const getOptionIdsMap = (newOption: Object) => {
    // { 1:1 }
    // converting to "1": 1 format
    return Object.fromEntries(
      Object.entries(newOption).map(([a, b]) => [a, b.id])
    );
  };

  const chooseOption = (
    typeId: number,
    option: VariationTypeOption,
    updateRouter: boolean = true
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = {
        ...prevSelectedOptions,
        [typeId]: option,
      };

      if (updateRouter) {
        router.get(
          url,
          {
            options: getOptionIdsMap(newOptions),
          },
          {
            preserveScroll: true,
            preserveState: true,
          }
        );
      }
      return newOptions;
    });
  };
  /* ----------------------------------------------------------------------------- */
  /* ----------------------------- QUANTITY CHANGE ------------------------------ */

  const { data, setData } = useForm({
    quantity: 1,
  });

  const handleQuantitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    form.setData("quantity", value);
  };

  /* ----------------------------------------------------------------------------- */
  /* --------------------------------- ADD TO CART ------------------------------- */
  const addToCart = () => {
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err) => {
        console.log(err);
      },
    });
  };
  /* ----------------------------------------------------------------------------- */
  /* ------------------------------- ADD TO WISHLIST ----------------------------- */
  // const addToWishlist = () => {
  //   form.post(route('wishlist.store', product.id), {
  //     preserveScroll: true,
  //     preserveState: true,
  //     onError: (err) => {
  //       console.log(err);
  //     }
  //   });
  // };
  /* ----------------------------------------------------------------------------- */

  /* --------------------------------- RENDERING --------------------------------- */
  const renderProductVariationTypes = () => {
    return product.variationTypes.map((type, index) => (
      <div key={type.id} className="flex flex-col mb-4">
        <b className="mb-2">{type.name}</b>

        {type.type === "Image" && (
          <div className="flex gap-2">
            {type.options.map((option) => (
              <div
                onClick={() => chooseOption(type.id, option)}
                key={option.id}
                className={`cursor-pointer border rounded p-1 ${
                  selectedOptions[type.id]?.id === option.id
                    ? "border-2 border-orange-600"
                    : "border-gray-300"
                }`}
              >
                {option.images?.length > 0 && (
                  <img
                    src={option.images[0].thumb}
                    alt={option.name}
                    className="w-[50px] h-[50px] object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {type.type === "Radio" && (
          <div className="flex join">
            {type.options.map((option) => (
              <input
                onChange={() => chooseOption(type.id, option)}
                key={option.id}
                className={`joint-item btn rounded-md ${
                  selectedOptions[type.id]?.id === option.id ? "primary" : ""
                }`}
                type="radio"
                value={option.id}
                checked={selectedOptions[type.id]?.id === option.id}
                name={"variation_type_" + type.id}
                aria-label={option.name}
              />
            ))}
          </div>
        )}
      </div>
    ));
  };

  const renderAddToCartButton = () => (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="text-sm font-medium">
          Qty:
        </label>
        <select
          id="quantity"
          value={form.data.quantity}
          onChange={handleQuantitySelect}
          className="text-sm px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
        >
          {Array.from(
            { length: computedProduct.quantity },
            (_, i) => i + 1
          ).map((qty) => (
            <option key={qty} value={qty}>
              {qty}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={addToCart}
        className="bg-orange-800 hover:bg-orange-700 text-white text-sm font-medium px-3 py-2 rounded-md transition flex items-center gap-1.5 shadow-sm"
      >
        <FaCartPlus className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );

  // const renderAddToWishlistButton = () => {
  //   return (
  //   );
  // }

  /* ----------------------------------------------------------------------------- */

  useEffect(() => {
    const idsMap = Object.fromEntries(
      Object.entries(selectedOptions).map(
        ([typeId, option]: [String, VariationTypeOption]) => [typeId, option.id]
      )
    );
    form.setData("option_ids", idsMap);

    console.log("selected option", selectedOptions);
  }, [selectedOptions]);

  return (
    <AuthenticatedLayout>
      <Head>
        <title>{product.title}</title>
        <meta name="title" content={product.meta_title || product.title} />
        <meta name="description" content={product.meta_description} />
        <link rel="canonical" href={route("product.show", product.slug)} />

        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.meta_description} />
        <meta property="og:image" content={images[0]?.small} />
        <meta property="og:url" content={route("product.show", product.slug)} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={appName} />
      </Head>

      <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-150px)]">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
          {/* Left Column - Image Carousel */}
          <div className="lg:col-span-6 lg:sticky lg:top-4 lg:self-start">
            <Carousel images={images} />
          </div>

          {/* Right Column - Product Details (scrollable but hides scrollbar) */}
          <div className="lg:col-span-6 lg:overflow-y-auto scrollbar-hide">
            {/* Product Title */}
            <h1 className="text-2xl font-bold">{product.title}</h1>

            {/* vendor */}
            <p className="mb-4">
              by{" "}
              <Link
                href={route("vendor.profile", product.user.store_name)}
                className="hover:underline"
              >
                {product.user.name}
              </Link>{" "}
              in{" "}
              <Link
                href={route("product.byDepartment", product.department.slug)}
                className="hover:underline"
              >
                {product.department.name}
              </Link>
            </p>

            {/* Price */}
            <div className="text-3xl font-semibold mb-6">
              <CurrencyFormatter amount={computedProduct.price} />
            </div>

            {/* Variations */}
            {product.variationTypes.length > 0 && (
              <div>{renderProductVariationTypes()}</div>
            )}

            {/* Stock Warning */}
            {computedProduct.quantity != undefined &&
              computedProduct.quantity < 10 && (
                <div className="text-red-600 my-4">
                  Only {computedProduct.quantity} left
                </div>
              )}

            {/* Add to Cart Section */}
            <div className="my-6 sticky bottom-0 bg-white py-4 z-10 lg:static lg:bg-transparent lg:py-0">
              {renderAddToCartButton()}
            </div>

            {/* About the Item Section */}
            <div className="product-description pb-8">
              <h2 className="text-xl font-bold mb-2">About the Item</h2>
              <div
                className="prose max-w-none text-gray-700 ck-content-output"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
export default Show;
