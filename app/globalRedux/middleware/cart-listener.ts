import {
  createListenerMiddleware,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  addToCart,
  changeItemQuantity,
  emptyCart,
  removeFromCart,
  updateCartItemByCartSerial,
} from "../features/cart/cart-slice";
import {
  initiateCheckout,
  updateProductFromCart,
} from "../features/checkout/checkout-slice";
import { RootState } from "../store";
import { trackEvent } from "@/lib/tracker";
import { TCartProduct } from "@/types/cart";
import { TInventoryItem } from "@/types/product";
import { getPrice } from "@/app/utils/price";

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(
    addToCart,
    removeFromCart,
    changeItemQuantity,
    emptyCart,
    updateCartItemByCartSerial,
    initiateCheckout
  ),
  effect: async (action, listenerApi) => {
    const payloadAction = action as unknown as PayloadAction<{
      product: TCartProduct;
    }>;
    const { dispatch } = listenerApi;
    const state = listenerApi.getState() as RootState;

    /**
     * Update Product For Checkout
     */

    if (payloadAction.type === "cart/addToCart") {
      const product = payloadAction.payload.product;
      trackEvent("add_to_cart", {
        productId: product._id,
        price: getPrice(product.price, product.map_price),
        quantity: product.quantity,
        slug: product.slug,
      });
    }

    const products = Object.values(state.persisted.cart.products);

    dispatch(updateProductFromCart(products));
  },
});
