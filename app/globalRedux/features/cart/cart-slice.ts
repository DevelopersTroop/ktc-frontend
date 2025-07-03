import { TCartProduct } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";

export type TCartState = { products: { [cartSerial: string]: TCartProduct } };
const initialState: TCartState = {
  products: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: TCartState,
      action: { payload: { product: TCartProduct } }
    ) => {
      const { product } = action.payload;

      // Find a matching product based on ID and metadata
      const existingProduct = Object.values(state.products).find(
        (p) =>
          p._id === product._id &&
          JSON.stringify(p.metaData) === JSON.stringify(product.metaData) // Ensure exact match including metadata
      );

      if (existingProduct) {
        // If the product exists, update its quantity
        if(existingProduct.metaData?.isFrontWheel){
          state.products[existingProduct.cartSerial].quantity += 2;
        }

        if(existingProduct.metaData?.isRearWheel){
          state.products[existingProduct.cartSerial].quantity += 2;
        }
        if(existingProduct.metaData?.isSquare){
          state.products[existingProduct.cartSerial].quantity += 4;
        }
        state.products[existingProduct.cartSerial].quantity += product.quantity;
        // Update the cartPackage in the payload so we can use it later
        product.cartPackage = existingProduct.cartPackage;
      } else {
        // If it's a new product, add it to the state
        state.products[product.cartSerial] = product;
      }
    },
    removeFromCart: (
      state: TCartState,
      action: { payload: { cartSerial?: string } }
    ) => {
      const cartSerial = action.payload.cartSerial;
      if (!cartSerial) {
        return;
      }


      const { category, cartPackage, item_class } = state.products[cartSerial];

      const removeItemsByCondition = (condition: (product: any) => boolean) => {
        Object.keys(state.products).forEach((serial) => {
          if (condition(state.products[serial])) {
            delete state.products[serial];
          }
        });
      };

      removeItemsByCondition(
        (product) => product.cartPackage === cartPackage
      );

      // if (state.products[cartSerial].category === "Tire") {
      //     // delete all `tire` of same package id
      //     const cartPackage = state.products[cartSerial].cartPackage;
      //     Object.keys(state.products).forEach((cartSerial) => {
      //         if ((state.products[cartSerial].cartPackage === cartPackage) && state.products[cartSerial].category === "Tire") {
      //             delete state.products[cartSerial];
      //         }
      //     })
      // } else {
      //     // delete all products of same cartPackage
      //     const cartPackage = state.products[cartSerial].cartPackage;
      //     Object.keys(state.products).forEach((cartSerial) => {
      //         if (state.products[cartSerial].cartPackage === cartPackage) {
      //             delete state.products[cartSerial];
      //         }
      //     })
      // }
    },
    changeItemQuantity: (
      state: TCartState,
      action: { payload: { cartSerial: string; quantity: number } }
    ) => {
      state.products[action.payload.cartSerial].quantity =
        action.payload.quantity;
    },
    updateCartItemByCartSerial: (
      state: TCartState,
      action: {
        payload: { cartSerial: string; product: Partial<TCartProduct> };
      }
    ) => {
      for (const cartSerial of Object.keys(state.products)) {
        if (cartSerial === action.payload.cartSerial) {
          state.products[cartSerial] = {
            ...state.products[cartSerial],
            ...action.payload.product,
          };
          break;
        }
      }
    },
    emptyCart: (state: TCartState) => {
      state.products = {};
    },
  },
});
export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  changeItemQuantity,
  updateCartItemByCartSerial,
  emptyCart,
} = cartSlice.actions;
