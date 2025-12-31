import { changeItemQuantity } from "@/app/globalRedux/features/cart/cart-slice";
import { TCartProduct } from "@/app/types/cart";
import CartQuantityInputBox from "@/app/ui/quantity-input-box/cart-quantity-input-box";
import { trackEvent } from "@/lib/tracker";
import { useDispatch } from "react-redux";

const Quantity = ({ cartProduct }: { cartProduct: TCartProduct }) => {
  const dispatch = useDispatch();
  return (
    <CartQuantityInputBox
      borderColor={" border-[#cfcfcf]"}
      className="scale-90"
      id={cartProduct.cartPackage}
      inputName={cartProduct.cartPackage}
      inputValue={cartProduct.quantity}
      maxInputValue={20}
      quantityStep={Math.abs(1)}
      onDecrease={() => {
        const newQty = cartProduct.quantity > 1 ? cartProduct.quantity - 1 : 1;
        dispatch(
          changeItemQuantity({
            cartSerial: cartProduct.cartSerial,
            quantity: newQty,
          })
        );
        trackEvent("update_cart", {
          action: "update_qty",
          productId: cartProduct._id,
          quantity: newQty,
        });
      }}
      onIncrease={() => {
        const newQty =
          20 - cartProduct.quantity > 1 ? cartProduct.quantity + 1 : 20;
        dispatch(
          changeItemQuantity({
            cartSerial: cartProduct.cartSerial,
            quantity: newQty,
          })
        );
        trackEvent("update_cart", {
          action: "update_qty",
          productId: cartProduct._id,
          quantity: newQty,
        });
      }}
      onInputChange={() => {}}
    />
  );
};

export default Quantity;
