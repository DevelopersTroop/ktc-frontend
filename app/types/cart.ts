import { TInventoryItem } from "./product";

export type TCartProduct = TInventoryItem & {
  cartPackage: string;
  cartSerial: string;
  quantity: number;
  metaData?: {
    isSquare?: boolean;
    isFrontWheel?: boolean;
    isRearWheel?: boolean;
    year?: string;
    make?: string;
    model?: string;
    trim?: string;
    suspension?: string;
    color?:string
  };
};
