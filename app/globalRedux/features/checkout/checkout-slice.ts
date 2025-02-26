import {
    Address,
    BillingAddress,
    Dealer,
    Order,
    OrderData,
    OrderInfo,
    RequestedDealer,
} from "@/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCheckoutState = OrderData & {
  orderSuccessData: Order | undefined;
};

const initialState: TCheckoutState = {
  discount: 0,
  selectedDealer: undefined,
  billingAddress: {
    address1: "",
    cityState: "",
    country: "",
    email: "",
    fname: "",
    lname: "",
    name: "",
    phone: "",
    zipCode: "",
    address2: "",
    company: "",
  },
  shippingAddress: {
    address1: "",
    cityState: "",
    country: "",
    email: "",
    fname: "",
    lname: "",
    name: "",
    phone: "",
    zipCode: "",
    address2: "",
    company: "",
  },
  isAccountCreated: false,
  netCost: "",
  totalCost: "",
  orderInfo: {
    fitmentDetails: "",
    newsLetter: "",
    newsLetterText: false,
    orderInfoText: false,
    phone: "",
    salesSpecialistName: "",
    termsAndConditions: false,
  },
  paymentStatus: "",
  productsInfo: [],
  selectedOption: 1,
  shippingMethod: undefined,
  selectedOptionTitle: undefined,
  requestedDealer: undefined,
  selectedDealerInfo: undefined,
  cartType: "",
  orderSuccessData: undefined,
  deliveryCharge: 0,
  isCouponApplied: false,
  couponCode: "",
  couponDiscount: 0,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setBillingAddress: (
      state: TCheckoutState,
      action: PayloadAction<BillingAddress>
    ) => {
      state.billingAddress = action.payload;
    },
    setShippingAddress: (
      state: TCheckoutState,
      action: PayloadAction<Partial<Address>>
    ) => {
      state.shippingAddress = {
        ...state.shippingAddress,
        ...action.payload,
      };
    },
    setSelectedDealerInfo: (
      state: TCheckoutState,
      action: PayloadAction<Dealer>
    ) => {
      state.selectedDealer = action.payload["Address Phone"];
      state.selectedDealerInfo = action.payload;
    },
    setRequestedDealer: (
      state: TCheckoutState,
      action: PayloadAction<RequestedDealer>
    ) => {
      state.requestedDealer = action.payload;
    },
    setSelectedOptionTitle: (
      state: TCheckoutState,
      action: PayloadAction<string>
    ) => {
      state.selectedOptionTitle = action.payload;
    },
    setSelectedOption: (
      state: TCheckoutState,
      action: PayloadAction<number>
    ) => {
      state.selectedOption = action.payload;
    },
    setShippingMethod: (
      state: TCheckoutState,
      action: PayloadAction<{ option: number; title: string }>
    ) => {
      state.shippingMethod = action.payload;
    },
    updateDiscount: (state, action: PayloadAction<number>) => {
      if (state.isCouponApplied) {
        state.discount += action.payload;
      } else {
        state.discount = action.payload;
      }
    },
    updateProductFromCart: (state, action: PayloadAction<any[]>) => {
      state.productsInfo = action.payload;
    },
    initiateCheckout: () => {},
    setOrderInfo: (state, action: PayloadAction<OrderInfo>) => {
      state.orderInfo = {
        ...state.orderInfo,
        ...action.payload,
      };
    },
    setIsAccountCreated: (state, action: PayloadAction<boolean>) => {
      state.isAccountCreated = action.payload;
    },
    updateOrderSuccessData: (state, action: PayloadAction<Order>) => {
      state.orderSuccessData = action.payload;
    },
    updateCouponCode: (
      state,
      action: PayloadAction<{ couponDiscount: number; couponCode: string }>
    ) => {
      if (state.isCouponApplied) return;
      state.isCouponApplied = true;
      state.couponCode = action.payload.couponCode;
      state.couponDiscount = action.payload.couponDiscount;
      state.discount += action.payload.couponDiscount;
    },
    revokeCouponCode: (state) => {
      if (state.isCouponApplied) {
        state.isCouponApplied = false;
        state.couponCode = "";
        if (state.discount >= state.couponDiscount) {
          state.discount -= state.couponDiscount;
        } else {
          state.discount = 0;
        }
      }
    },
  },
});

export default checkoutSlice.reducer;

export const {
  setBillingAddress,
  setSelectedDealerInfo,
  setShippingAddress,
  setRequestedDealer,
  setSelectedOptionTitle,
  setSelectedOption,
  setShippingMethod,
  updateDiscount,
  updateProductFromCart,
  initiateCheckout,
  setOrderInfo,
  updateOrderSuccessData,
  setIsAccountCreated,
  updateCouponCode,
  revokeCouponCode,
} = checkoutSlice.actions;
