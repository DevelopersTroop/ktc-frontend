import { TInventoryItem } from "@/types/product";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import EmptyCart from "./empty-cart";

const cartProducts: TInventoryItem[] = [
  {
    _id: 1,
    slug: "Wheel & Tire Package",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "20X12-51MM",
    },
    price: 1699.0,
    description: "High quality wheel",
    item_image: "/images/wheels/wheels1.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tuesday, Jan 21",
    vehicle: "2024 GMC Hummer EV Pickup 3X",
  },
  {
    _id: 3,
    slug: "Suspension Kit",
    title: {
      subtitle: "Rough Country V2 Shock Shaft Protector",
    },
    price: 19.95,
    item_image: "/images/suspension/suspension3.webp",
    delivery_date: "Saturday, Jan 18",
    vehicle: "2024 GMC Hummer EV Pickup 3X",
  },
  {
    _id: 4,
    slug: "Accessory",
    title: {
      subtitle: 'Body Armor 4x4 3/4" Black D-Ring with Red Isolators',
    },
    price: 15.95,
    item_image: "/images/accessories/accessories4.webp",
    delivery_date: "Wednesday, Jan 22",
    vehicle: "2024 GMC Hummer EV Pickup 3X",
  },
];

const cart = () => {
  return (
    <div>
      {!Object.keys(cartProducts).length ? (
        <>
          {" "}
          <EmptyCart />{" "}
        </>
      ) : (
        <>
          <div className="bg-gray-200">
            <div className="w-full max-w-[1600px] py-4 min-[1100px]:px-[50px] mx-auto">
              <h1 className="text-xl font-semibold pb-6 px-4 min-[1100px]:px-0">
                Shopping Cart
              </h1>
              <div className="w-full flex flex-col min-[1100px]:flex-row gap-4 min-[1100px]:gap-20">
                <div className="w-full min-[1100px]:w-4/6 flex flex-col gap-6 px-[5%] min-[1100px]:px-0 order-2 min-[1100px]:order-1">
                  {cartProducts.map((product) => (
                    <div key={product._id} className="w-full bg-white p-4">
                      <div className="flex gap-4 text-black">
                        <p className="text-xl font-semibold ">{product.slug}</p>
                        <p className="font-medium hidden md:block">
                          Vehicle: {product.vehicle}
                        </p>
                        <div className="block md:hidden flex-1 text-end">
                          <button className="text-lg text-primary">
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-8  mt-2">
                        <div className="w-full md:w-4/6 order-2 md:order-1">
                          <div className="w-full flex gap-5 items-center md:items-start">
                            <div>
                              <img
                                src={product.item_image}
                                alt={product.title?.subtitle}
                                className="w-20 h-20"
                              />
                            </div>
                            <div className="hidden md:block">
                              <p className="text-xl font-semibold">
                                {product.title?.subtitle}
                              </p>
                            </div>
                            <div className="flex-1 text-end">
                              <p className="flex items-start justify-end font-semibold">
                                $
                                <span className="text-2xl">
                                  {product.price}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col text-end gap-3 md:pb-36 md:border-b border-gray-300">
                            <div className="flex justify-end gap-2">
                              <p className="text-lg font-medium">Quantity:</p>
                              <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="w-16 text-center border border-gray-300 rounded"
                                // onChange={(e) => {
                                //   const newQuantity = parseInt(
                                //     e.target.value,
                                //     10
                                //   );
                                // }}
                              />
                            </div>
                            <div className="hidden md:block">
                              <button className="text-xl text-primary">
                                Remove
                              </button>
                            </div>
                          </div>

                          <div className="w-full md:hidden pb-5 border-b border-gray-300">
                            <p className="text-xl font-semibold">
                              {product.title?.subtitle}
                            </p>
                          </div>

                          <div className="flex justify-between mt-2">
                            <p className="text-2xl font-semibold">Item Total</p>
                            <p className="text-primary flex items-start">
                              $
                              <span className="text-2xl font-semibold">
                                {product.price}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="w-full md:w-2/6 order-1 md:order-2">
                          <div className="md:border-b border-gray-400 pb-5">
                            <h1 className="text-base font-semibold">
                              Choose your delivery Option:
                            </h1>
                            <div className="flex flex-row items-center gap-2 shadow-2xl md:shadow-none p-5 md:p-0">
                              <div>
                                <input
                                  className="w-5 h-5"
                                  type="checkbox"
                                  id={`delivery-option-${product._id}`}
                                  name="delivery-option"
                                  defaultChecked
                                />
                              </div>
                              <div className="flex flex-col text-lg">
                                <p className="text-primary font-semibold">
                                  Tuesday, Jan 21
                                </p>
                                <p>Standard Shipping</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <h1 className="text-base font-semibold">
                              Shipping Protection
                            </h1>
                            <div className="flex flex-row items-center gap-2 shadow-2xl md:shadow-none p-5 md:p-0">
                              <div>
                                <input
                                  className="w-5 h-5"
                                  type="checkbox"
                                  id={`delivery-option-${product._id}`}
                                  name="delivery-option"
                                />
                              </div>
                              <div className="flex flex-col text-lg">
                                <p className="font-semibold">$6.00</p>
                                <p>Covers lost, stolen, or Damaged packages</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full min-[1100px]:w-2/6 bg-white p-8 shadow h-full text-center order-1 min-[1100px]:order-2">
                  <h2 className="uppercase font-semibold text-3xl">
                    Order Summary
                  </h2>
                  <div className="flex flex-col gap-4 mt-6">
                    <div className="flex justify-between text-xl font-medium text-start">
                      <p className="uppercase">Original Price</p>
                      <p>$3,281.09</p>
                    </div>
                    <div className="flex justify-between text-xl font-medium text-start">
                      <p className="uppercase">Discount Savings</p>
                      <p>$3,281.09</p>
                    </div>
                    <div className="flex justify-between text-xl font-medium text-start">
                      <p className="uppercase">Subtotal</p>
                      <p>$3,281.09</p>
                    </div>
                    <div className="flex justify-between text-xl font-medium text-start">
                      <p className="uppercase">Shipping</p>
                      <p>$3,281.09</p>
                    </div>
                    <div className="flex justify-between text-xl font-medium text-start">
                      <p className="uppercase">Shipping Protection</p>
                      <p>$3,281.09</p>
                    </div>
                    <div className="border-b border-gray-800"></div>
                  </div>
                  <div>
                    <h2 className="uppercase text-2xl font-medium mt-2">
                      Total Before Tax
                    </h2>
                    <p className="text-4xl font-semibold mt-2">$3,327.81</p>
                    <p className="text-sm mt-4">
                      Tax is calculated during checkout
                    </p>
                  </div>
                  <div className="my-4 mx-[10%]">
                    <Link href="/cart">
                      <button className="w-full py-2 bg-gray-400 rounded shadow-2xl text-white text-xl  font-semibold">
                        Choose Shipping Optons
                      </button>
                    </Link>
                  </div>
                  <div className="mx-[10%]">
                    <Link href="/collections/product-category/wheels">
                      <button className="w-full py-2 outline outline-1 text-lg font-semibold rounded">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                  <div className="flex justify-center gap-5 mt-3 text-lg text-primary font-medium cursor-pointer">
                    <div className="flex gap-2 items-center">
                      <p>Share</p>
                      <MdKeyboardArrowRight />
                    </div>
                    <div className="flex gap-2 items-center">
                      <p>Save for Later</p>
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default cart;
