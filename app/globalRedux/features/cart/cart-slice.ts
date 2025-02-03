import { TCartProduct } from "@/app/types/cart";
import { createSlice } from "@reduxjs/toolkit";

export type TCartState = { products: { [cartSerial: string]: TCartProduct } };
const initialState: TCartState = {
    products: {}
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: TCartState, action: { payload: { product: TCartProduct } }) => {
            state.products[action.payload.product.cartSerial] = action.payload.product
        },
        removeFromCart: (state: TCartState, action: { payload: { cartSerial?: string } }) => {
            const cartSerial = action.payload.cartSerial
            if (!cartSerial) {
                return;
            }

            if (state.products[cartSerial].category === "Tire") {
                // delete all `tire` of same package id
                const cartPackage = state.products[cartSerial].cartPackage;
                Object.keys(state.products).forEach((cartSerial) => {
                    if ((state.products[cartSerial].cartPackage === cartPackage) && state.products[cartSerial].category === "Tire") {
                        delete state.products[cartSerial];
                    }
                })
            } else {
                // delete all products of same cartPackage
                const cartPackage = state.products[cartSerial].cartPackage;
                Object.keys(state.products).forEach((cartSerial) => {
                    if (state.products[cartSerial].cartPackage === cartPackage) {
                        delete state.products[cartSerial];
                    }
                })
            }
        },
        changeItemQuantity: (state: TCartState, action: { payload: { cartSerial: string, quantity: number } }) => {
            state.products[action.payload.cartSerial].quantity = action.payload.quantity;
        },
        updateCartItemByCartSerial: (state: TCartState, action: { payload: { cartSerial: string, product: Partial<TCartProduct> } }) => {
            for (const cartSerial of Object.keys(state.products)) {
                if (cartSerial === action.payload.cartSerial) {
                    state.products[cartSerial] = { ...state.products[cartSerial], ...action.payload.product };
                    break;
                }
            }
        },
        emptyCart: (state: TCartState) => {
            state.products = {}
        }
    }
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart, changeItemQuantity, updateCartItemByCartSerial, emptyCart } = cartSlice.actions;