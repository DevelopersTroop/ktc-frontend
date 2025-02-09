"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import yearMakeModelReducer from "@/app/globalRedux/features/year-make-model/year-make-model-slice";
import yearMakeModelModalReducer from "@/app/globalRedux/features/year-make-model-modal/year-make-model-modal-slice";
import newsletterModalReducer from "@/app/globalRedux/features/newsletter-modal/newsletter-modal-slice";
import filterHeightReducer from "@/app/globalRedux/features/filter-height/filter-height-slice";
import menuReducer from "@/app/globalRedux/features/menu/menu-slice";
import searchRouterSlice from "@/app/globalRedux/features/serach-router/search-router-slice";
import inStockProductReducer from "@/app/globalRedux/features/in-stock-product/in-stock-product-slice";
import customProductReducer from "@/app/globalRedux/features/custom-product/custom-product-slice";
import cartReducer from "@/app/globalRedux/features/cart/cart-slice";
import cartProductSaveEmailReducer from "@/app/globalRedux/features/cart/cart-products-Save-email-slice";
import tirePackageReducer from "@/app/globalRedux/features/tire-package/tire-package-slice";
import checkoutReducer from "@/app/globalRedux/features/checkout/checkout-slice";
import userReducer from "@/app/globalRedux/features/user/user-slice";
import customSteeringWheelReducer from "@/app/globalRedux/features/custom-steering-wheel/custom-steering-wheel-slice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


const rootPersistConfig = {
    key: 'ktc-audio-store',
    storage,
}

const presistingReducer = combineReducers({
    yearMakeModel: yearMakeModelReducer,
    cart: cartReducer,
    customProduct: customProductReducer,
    customSteeringWheel: customSteeringWheelReducer,
    tirePackage: tirePackageReducer,
    user: userReducer,
    checkout: checkoutReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, presistingReducer);

const rootReducer = combineReducers({
    persisted: persistedReducer,
    searchRouter: searchRouterSlice,
    filterHeight: filterHeightReducer,
    yearMakeModelModal: yearMakeModelModalReducer,
    inStockProduct: inStockProductReducer,
    menu: menuReducer,
    newsletterModal: newsletterModalReducer,
    saveEmail: cartProductSaveEmailReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export default store;