"use client";
import { removeFromCart } from "@/app/globalRedux/features/cart/cart-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { s3BucketUrl } from "@/app/utils/api";
import { truncWord } from "@/app/utils/string";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useDispatch } from "react-redux";
import CardPrice from "./card-price";

export const AccessoriesCard: React.FC<{ accessories: any[] }> = ({
  accessories,
}) => {
  const wheelFinish = {
    "Steering Wheel": "",
  };
  const { products: cartProducts } = useTypedSelector(
    (state) => state.persisted.cart,
  );
  const dispatch = useDispatch();

  const hasProductSelected = (serial: string) => {
    const products = Object.values(cartProducts);

    return (
      products.findIndex((p) => {
        return p.cartSerial === serial;
      }) !== -1
    );
  };

  const handleCheckboxChange = (itemKey: string): void => {
    dispatch(
      removeFromCart({
        cartSerial: itemKey,
      }),
    );
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <div className="space-y-2">
          {accessories?.map((p) => {
            const msrp = p.msrp ? p.msrp : p.price - 100;
            return (
              <div
                key={p._id}
                onClick={() => handleCheckboxChange(p.cartSerial)}
                className="flex cursor-pointer items-start border-b border-gray-200 p-4 hover:bg-gray-50"
              >
                <Checkbox
                  checked={hasProductSelected(p.cartSerial)}
                  onCheckedChange={() => handleCheckboxChange(p.cartSerial)}
                  className="mt-1 h-5 w-5 data-[state=checked]:bg-gray-900"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="w-2/3">
                      <div className="flex w-full items-center gap-2">
                        <img
                          className="w-12"
                          src={`${s3BucketUrl}/${p.item_image}`}
                        />
                        <div>
                          <span className="font-medium">
                            {truncWord(p.title)}
                          </span>
                          <p className="mt-1 text-sm text-gray-600">
                            Same design as your wheels, made just for you.
                          </p>
                        </div>
                      </div>

                      {p.item_class === "Steering Wheel" && (
                        <div
                          className="mt-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              Color:
                            </span>
                            <Select
                              disabled
                              value={p.metaData.standardFinish}
                              // onValueChange={(value: any) =>
                              //     // setWheelColor(prev => ({ ...prev, [p._id]: value }))
                              // }
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(
                                  wheelFinish["Steering Wheel"],
                                ).map(([key, value]) => {
                                  return (
                                    <SelectItem key={key} value={key}>
                                      {key}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex w-1/2 flex-col items-end justify-end gap-2 sm:flex-row">
                      <CardPrice price={p.price.toFixed(2)} />
                      <div className="relative flex items-baseline gap-0 line-through">
                        <h4 className="text-sm leading-[21px] text-muted">
                          <span className="text-sm font-normal text-muted">
                            ${msrp.toFixed(2).split(".")[0]}.
                          </span>
                        </h4>

                        <small className="!text-[12px] leading-[17px] text-muted">
                          <span className="!text-[12px] font-normal text-muted">
                            {msrp.toFixed(2).split(".")[1]}
                          </span>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
