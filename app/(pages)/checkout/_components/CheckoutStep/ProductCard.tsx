import { useTypedSelector } from "@/app/globalRedux/store";
import { AccessoriesCard } from "@/components/shared/accessories-card";
import CartSubtotal from "@/components/shared/cart-subtotal";
import CartTitle from "@/components/shared/cart-title";
import WheelCard from "@/components/shared/wheel-card";
import { TCartProduct } from "@/types/cart";

export const ProductCard = ({}) => {
  const cart = useTypedSelector((state) => state.persisted.cart);
  const groupedProducts = Object.values(cart.products).reduce(
    (acc, product) => {
      const packageId = product.cartPackage || "no-package";
      if (!acc[packageId]) {
        acc[packageId] = { wheels: product, tires: [] };
      } else {
        const accessories =
          Object.values(cart.products).filter(
            (p) =>
              p.category === "Accessories" ||
              (p.item_class === "Steering Wheel" &&
                p.cartPackage === packageId),
          ) || [];
        acc[packageId].tires.push({ ...product, accessories });
      }
      return acc;
    },
    {} as Record<
      string,
      {
        wheels: TCartProduct;
        tires: Tire[];
      }
    >,
  );

  return (
    <div className="mt-8 flex flex-col gap-8 xl:flex-row">
      <div className="w-full">
        <CartTitle />

        <div className="relative flex w-full flex-col items-start gap-0 self-stretch overflow-hidden rounded-xl border border-[#cfcfcf] bg-white">
          {/* <CartYMM /> */}

          {Object.entries(groupedProducts).map(
            ([packageId, { wheels, tires }], index) => {
              return (
                <div key={`${packageId}-${index}`} className="w-full">
                  <WheelCard
                    key={wheels.cartSerial}
                    cartProduct={wheels}
                    isTirePackage={tires.some((t) => t.category === "Tire")}
                  />
                  {tires.some((t) => t.category === "Tire") && (
                    <TiresCard
                      key={tires[0].cartSerial}
                      tires={tires?.filter((t) => t.category === "Tire")}
                    />
                  )}
                  {tires[0]?.accessories?.length > 0 && (
                    <AccessoriesCard
                      key={tires[0].accessories[0].cartSerial}
                      accessories={tires[0].accessories}
                    />
                  )}
                </div>
              );
            },
          )}
          <CartSubtotal />
        </div>
      </div>

      {/* summery */}
      {/* <CartSummary /> */}
    </div>
  );
};
