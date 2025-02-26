import { changeItemQuantity } from "@/app/globalRedux/features/cart/cart-slice";
import { TCartProduct } from "@/types/cart";
import { useDispatch } from "react-redux";
import CartQuantityInputBox from "./cart-quantity-input-box";

const Quantity = ({
  cartProduct,
  isTirePackage,
}: {
  cartProduct: TCartProduct;
  isTirePackage: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <CartQuantityInputBox
      borderColor={" border-[#cfcfcf]"}
      className="scale-90"
      id={cartProduct.cartPackage}
      inputName={cartProduct.cartPackage}
      inputValue={cartProduct.quantity}
      maxInputValue={cartProduct.maxInventory}
      quantityStep={Math.abs(cartProduct.inventoryStep)}
      onDecrease={() => {
        if (!isTirePackage) {
          let newQuantity = cartProduct.quantity;
          if (cartProduct.category === "Custom Wheels") {
            newQuantity = cartProduct.quantity + cartProduct.inventoryStep;
          } else {
            newQuantity =
              cartProduct.quantity + cartProduct.inventoryStep >
              cartProduct.maxInventory
                ? cartProduct.maxInventory
                : cartProduct.quantity + cartProduct.inventoryStep;
          }
          dispatch(
            changeItemQuantity({
              cartSerial: cartProduct.cartSerial,
              quantity: newQuantity,
            }),
          );
        } else {
          dispatch(
            updateTirePackageQuantity({
              packageId: cartProduct.cartPackage,
              type: "increase",
            }),
          );
        }
      }}
      onIncrease={() => {
        if (!isTirePackage) {
          dispatch(
            changeItemQuantity({
              cartSerial: cartProduct.cartSerial,
              quantity:
                cartProduct.quantity - cartProduct.inventoryStep >=
                cartProduct.inventoryStep
                  ? cartProduct.quantity - cartProduct.inventoryStep
                  : cartProduct.inventoryStep,
            }),
          );
        } else {
          dispatch(
            updateTirePackageQuantity({
              packageId: cartProduct.cartPackage,
              type: "decrease",
            }),
          );
        }
      }}
      onInputChange={() => {}}
    />
  );
};

export default Quantity;
