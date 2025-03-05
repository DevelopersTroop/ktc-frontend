import { changeItemQuantity } from "@/app/globalRedux/features/cart/cart-slice";
import { TCartProduct } from "@/app/types/cart";
import CartQuantityInputBox from "@/app/ui/quantity-input-box/cart-quantity-input-box";
import { useDispatch } from "react-redux";

const Quantity = ({
  cartProduct,
}: {
  cartProduct: TCartProduct;
}) => {
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
        dispatch(
          changeItemQuantity({
            cartSerial: cartProduct.cartSerial,
            quantity: cartProduct.quantity > 1 ? cartProduct.quantity - 1 : 1,
          })
        );
      }}
      onIncrease={() => {
        dispatch(
          changeItemQuantity({
            cartSerial: cartProduct.cartSerial,
            quantity: 20 - cartProduct.quantity > 1
                ? cartProduct.quantity + 1
                : 20,
          })
        );
      }}
      onInputChange={() => {}}
    />
  );
};

export default Quantity;
