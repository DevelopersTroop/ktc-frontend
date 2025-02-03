import { createSlice } from '@reduxjs/toolkit';


export type TShippingMethod = {
    _id: string;
    title: string;
    amount: number;
    estimatedDelivery: string;
    description: string;
    updatedBy: string;
    deletedBy: null;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TBillingAddress = {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    country?: string;
    apartment?: string;
    [key: string]: string | undefined;
}

export type TDealer = {
    Addressee: string;
    "Address Phone": string;
    "Address 1": string;
    "Address 2"?: string;
    City: string;
    "State/Province": {
        text: string;
        value: string;
    };
    "State/Province Display Name": {
        text: string;
        value: string;
    };
    "Zip Code": string;
    Country: {
        text: string;
        value: string;
    };
    "Country Code": string;
};
export type TCheckoutState = {
    billingAddress?: TBillingAddress,
    shippingMethod?: TShippingMethod,
    shippingDealer?: TDealer,
}

const initialState = {} as TCheckoutState

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setBillingAddress: (state: TCheckoutState, action: { payload: { billingAddress: TBillingAddress } }) => {
            state.billingAddress = action.payload.billingAddress;
        },

        setShippingMethod: (state: TCheckoutState, action: { payload: { shippingMethod: TShippingMethod } }) => {
            state.shippingMethod = action.payload.shippingMethod;
        },
        setShippingDealer: (state: TCheckoutState, action: { payload: { shippingDealer: TDealer | undefined } }) => {
            state.shippingDealer = action.payload.shippingDealer;
        }
    }
});
export default checkoutSlice.reducer;
export const { setBillingAddress, setShippingMethod, setShippingDealer } = checkoutSlice.actions;