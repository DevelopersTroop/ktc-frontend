"use client";
import cartProductSaveEmailReducer from "@/app/globalRedux/features/cart/cart-products-Save-email-slice";
import cartReducer from "@/app/globalRedux/features/cart/cart-slice";
import checkoutReducer from "@/app/globalRedux/features/checkout/checkout-slice";
import customProductReducer from "@/app/globalRedux/features/custom-product/custom-product-slice";
import customSteeringWheelReducer from "@/app/globalRedux/features/custom-steering-wheel/custom-steering-wheel-slice";
import filterHeightReducer from "@/app/globalRedux/features/filter-height/filter-height-slice";
import inStockProductReducer from "@/app/globalRedux/features/in-stock-product/in-stock-product-slice";
import menuReducer from "@/app/globalRedux/features/menu/menu-slice";
import newsletterModalReducer from "@/app/globalRedux/features/newsletter-modal/newsletter-modal-slice";
import searchRouterSlice from "@/app/globalRedux/features/serach-router/search-router-slice";
import tirePackageReducer from "@/app/globalRedux/features/tire-package/tire-package-slice";
import userReducer from "@/app/globalRedux/features/user/user-slice";
import yearMakeModelModalReducer from "@/app/globalRedux/features/year-make-model-modal/year-make-model-modal-slice";
import yearMakeModelReducer from "@/app/globalRedux/features/year-make-model/year-make-model-slice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
    FLUSH, PAUSE,
    PERSIST, persistReducer, persistStore, PURGE,
    REGISTER, REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import tireReducer from './features/tire';
import wheelReducer from "./features/wheel";
import accessoriesReducer from "./features/accessories"
import { cartListenerMiddleware } from "./middleware/cart-listener";

const rootPersistConfig = {
  key: "ktc-audio-store",
  storage,
};

const presistingReducer = combineReducers({
  cart: cartReducer,
  customProduct: customProductReducer,
  customSteeringWheel: customSteeringWheelReducer,
  tirePackage: tirePackageReducer,
  user: userReducer,
  checkout: checkoutReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, presistingReducer);

const rootReducer = combineReducers({
  persisted: persistedReducer,
  yearMakeModel: yearMakeModelReducer,
  searchRouter: searchRouterSlice,
  filterHeight: filterHeightReducer,
  yearMakeModelModal: yearMakeModelModalReducer,
  inStockProduct: inStockProductReducer,
  menu: menuReducer,
  newsletterModal: newsletterModalReducer,
  saveEmail: cartProductSaveEmailReducer,
  wheel: wheelReducer,
  tire:tireReducer,
  accessories: accessoriesReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(cartListenerMiddleware.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

export const useTypedSelector = <TypedUseSelectorHook<RootState>>useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
