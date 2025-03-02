import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addToCart, changeItemQuantity, emptyCart, removeFromCart, updateCartItemByCartSerial } from "../features/cart/cart-slice";
import { initiateCheckout, updateProductFromCart } from "../features/checkout/checkout-slice";
import { RootState } from "../store";

export const cartListenerMiddleware= createListenerMiddleware()

cartListenerMiddleware.startListening({
  matcher:isAnyOf(addToCart,removeFromCart,changeItemQuantity,emptyCart,updateCartItemByCartSerial,initiateCheckout),
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    const state = listenerApi.getState() as RootState

        /**
         * Update Product For Checkout
         */

    const products = Object.values(state.persisted.cart.products);

     dispatch(updateProductFromCart(products))
  }
})
