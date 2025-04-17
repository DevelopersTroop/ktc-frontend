export type OrderInfo = {
  phone: string;
  orderInfoText: boolean;
  newsLetterText: boolean;
  newsLetter: string;
  salesSpecialistName: string;
  fitmentDetails: string;
  termsAndConditions: boolean;
};

export interface Dealer {
  "Address 1": any;
  "Address 2"?: any;
  "Address Phone": any;
  Addressee: any;
  City: any;
  Country: {
    text: any;
    value: any;
  };
  "Country Code": any;
  "State/Province": {
    text: any;
    value: any;
  };
  "State/Province Display Name": {
    text: any;
    value: any;
  };
  "Zip Code": any;
  distance: any;
  coordinates: [any, any];
}

export type BillingAddress = {
  name: string;
  fname: string;
  lname: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  cityState: string;
  phone: string;
  email: string;
  zipCode: string;
};

export type Address = BillingAddress & {
  isPrimaryPhone?: boolean;
  password?: string;
  primaryPhone?: string;
};

export type ProductInfo = {
  _id: string;
  title: string;
  slug: string;
  internal_id: string;
  sku: string;
  item_type: string;
  item_class: string;
  brand: string;
  model_group: string;
  forging_style: string;
  wheel_size: string;
  wheel_diameter: string;
  wheel_width: string;
  finish: string;
  lip_size: string;
  offset: string;
  bolt_pattern_1: string;
  bolt_pattern_2: string;
  centerbore: string;
  load_rating: string;
  xfactor: string;
  yfactor: string;
  backspacing: string;
  raw_size: string;
  tire_width: string;
  tire_aspect_ratio: string;
  tire_diameter: string;
  ship_weight: string;
  ship_width: string;
  ship_height: string;
  ship_depth: string;
  purchase_description: string;
  short_description: string;
  item_image: string;
  forging_series: string[];
  gallery_images: string[];
  stock_available: boolean;
  msrp: number;
  price: number;
  inventory_available: number;
  build_available: string;
  steering_wheel_addon_options_1: string;
  steering_wheel_addon_options_2: string;
  steering_wheel_addon_options_3: string;
  terrain: string;
  blank_bolt_patterns: string;
  design_type: string;
  spoke_style: string[];
  style: string;
  tire_type: string[];
  meta: string;
  finish_type: string;
  suspension_type: string;
  speed_rating: string;
  sidewall: string;
  tire_load_index: string;
  tire_max_load_lbs: string;
  tire_max_load_lbs_2: string;
  tire_max_load_kg: string;
  tire_max_load_kg_2: string;
  ply: string;
  approved_rim_contours: string;
  tread_depth_32nds: string;
  tread_depth_mm: string;
  std_rim: string;
  sort_price: number;
  max_air_pressure_kpa: string;
  max_air_pressure_psi: string;
  dually: boolean;
  passenger: boolean;
  imageUploaded: boolean;
  categoryId: string;
  updatedBy: string | null;
  deletedBy: string | null;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
  id: string;
  image: string;
  maxInventory: number;
  inventoryStep: number;
  minInventory: number;
  vehicleInformation: string;
  quantity: number;
  cartPackage: string;
  cartSerial: string;
};

export type RequestedDealer = {
  businessName: string;
  website: string;
  contact: string;
};

export type OrderData = {
  orderInfo: OrderInfo;
  shippingAddress: Address;
  billingAddress: BillingAddress;
  productsInfo: ProductInfo[];
  discount: number;
  cartType: string;
  totalCost: string;
  isAccountCreated: any;
  netCost: string;
  selectedDealer?: string;
  selectedOptionTitle?: string;
  selectedDealerInfo?: Dealer;
  requestedDealer?: RequestedDealer;
  paymentStatus: string;
  selectedOption: number;
  deliveryCharge: number;
  isCouponApplied: boolean;
  shippingProtection: number;
  couponCode: string;
  shippingMethod?: { option: number; title: string };
  couponDiscount: number;
};

export type Order = {
  _id: string;
  email: string;
  data: OrderData;
  status: string;
  updatedBy: string | null;
  deletedBy: string | null;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
};
