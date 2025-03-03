"use client";

import { setShippingAddress } from "@/app/globalRedux/features/checkout/checkout-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { Flex } from "@/components/shared/flex";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Input as TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckout } from "@/context/CheckoutContext";
import { Address } from "@/types/order";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: any;
  required?: boolean;
  error?: any;
}

export const Input = ({
  label,
  required = false,
  error,
  ...props
}: InputProps) => (
  <div className="flex w-full flex-col gap-y-3">
    <label className="mb-1 block text-lg font-medium leading-[24px]">
      {label}
      {required && <span className="ml-1 text-red-600">*</span>}
    </label>
    <TextInput
      disabled={props.disabled}
      className={`w-full rounded-[10px] border px-3 py-2 ${
        error ? "border-red-500" : "h-14 border-[#D9D9D9] font-medium"
      } bg-white text-gray-900 focus:outline-none`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const StepOne = () => {
  const [showRequiredAlert, setShowRequiredAlert] = useState(false);
  const [requiredFields, setRequiredFields] = useState<string[]>([]);
  /**
   * Redux Store & Dispatch Hook
   */
  const { shippingAddress } = useTypedSelector(
    (state) => state.persisted.checkout,
  );
  const dispatch = useDispatch();
  const { setStep } = useCheckout();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Address>({
    mode: "onChange",
    defaultValues: {
      ...shippingAddress,
      isPrimaryPhone: true,
    },
  });

  // Watch required fields
  const firstName = watch("fname");
  const lastName = watch("lname");
  const address1 = watch("address1");
  const zipCode = watch("zipCode");
  const cityState = watch("cityState");
  const phone = watch("phone");
  const email = watch("email");

  const validateForm = () => {
    const missing: string[] = [];
    if (!firstName) missing.push("First Name");
    if (!lastName) missing.push("Last Name");
    if (!address1) missing.push("Address Line 1");
    if (!zipCode) missing.push("ZIP/postal Code");
    if (!cityState) missing.push("City/State");
    if (!phone) missing.push("Phone Number");
    if (!email) missing.push("Email Address");

    setRequiredFields(missing);
    return missing.length === 0;
  };

  /**
   * Submit Handler
   */
  const onSubmit = async (data: Address) => {
    if (!validateForm()) {
      setShowRequiredAlert(true);
      return;
    }
    dispatch(
      setShippingAddress({ ...data, name: `${data.fname} ${data.lname}` }),
    );
    setStep(2);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="grid grid-cols-12">
      <form
        className="col-span-12 flex max-w-4xl flex-col gap-y-8 md:col-span-7 lg:col-span-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="text-[24px] font-bold">Shipping Address</h2>

        {showRequiredAlert && requiredFields.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fill in the following required fields:{" "}
              {requiredFields.join(", ")}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-y-8">
          <div className="flex gap-4">
            <Input
              label="First Name"
              required
              error={errors.fname?.message}
              {...register("fname", {
                required: "First name is required",
              })}
            />
            <Input
              label="Last Name"
              required
              error={errors.lname?.message}
              {...register("lname", {
                required: "Last name is required",
              })}
            />
          </div>

          <Input label="Company/Care of" {...register("company")} />

          <Flex>
            <div className="flex w-full flex-col gap-3">
              <Input
                label="Address Line 1"
                required
                error={errors.address1?.message}
                {...register("address1", {
                  required: "Address is required",
                })}
              />
              <div className="text-sm text-muted">
                Note: Cannot be a P.O. box, except at APO/FPO addresses.
              </div>
            </div>

            <Input label="Address Line 2" {...register("address2")} />
          </Flex>

          <Flex>
            <Input
              label="ZIP/postal Code"
              required
              error={errors.zipCode?.message}
              {...register("zipCode", {
                required: "ZIP/Postal Code is required",
              })}
            />

            <Input
              label="City/State"
              required
              error={errors.cityState?.message}
              {...register("cityState", {
                required: "City/State is required",
              })}
            />
          </Flex>

          <Flex>
            <div className="flex w-full flex-col gap-3">
              <Input
                label="Shipping Phone Number"
                type="tel"
                required
                error={errors.phone?.message}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[0-9\s-()]+$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                placeholder="123-456-7890"
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isPrimaryPhone"
                  checked={watch("isPrimaryPhone")}
                  className="h-5 w-5 border-black data-[state=checked]:bg-black"
                  onCheckedChange={(checked) => {
                    setValue("isPrimaryPhone", checked as boolean);
                  }}
                />
                <Label
                  htmlFor="isPrimaryPhone"
                  className="cursor-pointer text-lg"
                >
                  This is my primary contact phone number.
                </Label>
              </div>
            </div>

            <div className="flex w-full flex-col gap-y-3">
              <Input
                label="Email Address"
                required
                type="email"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              <div className="text-sm text-muted">
                We require your phone number and email address for efficient
                order processing.
              </div>
            </div>
          </Flex>

          <div className="flex gap-4 font-semibold">
            <button
              type="submit"
              className="flex h-14 w-full max-w-fit items-center gap-2 rounded bg-primary px-4 py-3 text-white transition-colors hover:bg-primary"
              onClick={() => {
                if (!validateForm()) {
                  setShowRequiredAlert(true);
                }
              }}
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.166 3.33337H8.83268C5.68999 3.33337 4.11864 3.33337 3.14233 4.30968C2.43938 5.01264 2.24255 6.02406 2.18745 7.70837H18.8113C18.7561 6.02406 18.5593 5.01264 17.8564 4.30968C16.8801 3.33337 15.3087 3.33337 12.166 3.33337Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.166 16.6667H8.83268C5.68999 16.6667 4.11864 16.6667 3.14233 15.6904C2.16602 14.7141 2.16602 13.1427 2.16602 10C2.16602 9.63176 2.16602 9.28507 2.16759 8.95837H18.8311C18.8327 9.28507 18.8327 9.63176 18.8327 10C18.8327 13.1427 18.8327 14.7141 17.8564 15.6904C16.8801 16.6667 15.3087 16.6667 12.166 16.6667ZM13.87 10.2084C14.2307 10.2083 14.5613 10.2083 14.8304 10.2445C15.1266 10.2843 15.4397 10.378 15.6972 10.6355C15.9547 10.893 16.0484 11.2061 16.0883 11.5024C16.1244 11.7714 16.1244 12.1021 16.1244 12.4628V12.5373C16.1244 12.898 16.1244 13.2287 16.0883 13.4977C16.0484 13.7939 15.9547 14.1071 15.6972 14.3646C15.4397 14.6221 15.1266 14.7158 14.8304 14.7556C14.5613 14.7918 14.2306 14.7918 13.87 14.7917L13.8327 14.7917L13.7954 14.7917C13.4347 14.7918 13.104 14.7918 12.835 14.7556C12.5388 14.7158 12.2257 14.6221 11.9682 14.3646C11.7106 14.1071 11.6169 13.7939 11.5771 13.4977C11.5409 13.2287 11.541 12.898 11.541 12.5373L11.541 12.5L11.541 12.4628C11.541 12.1021 11.5409 11.7714 11.5771 11.5024C11.6169 11.2061 11.7106 10.893 11.9682 10.6355C12.2257 10.378 12.5388 10.2843 12.835 10.2445C13.104 10.2083 13.4347 10.2083 13.7954 10.2084H13.87ZM4.87435 11.25C4.87435 10.9049 5.15417 10.625 5.49935 10.625H7.16602C7.51119 10.625 7.79102 10.9049 7.79102 11.25C7.79102 11.5952 7.51119 11.875 7.16602 11.875H5.49935C5.15417 11.875 4.87435 11.5952 4.87435 11.25ZM4.87435 13.75C4.87435 13.4049 5.15417 13.125 5.49935 13.125H8.83268C9.17786 13.125 9.45768 13.4049 9.45768 13.75C9.45768 14.0952 9.17786 14.375 8.83268 14.375H5.49935C5.15417 14.375 4.87435 14.0952 4.87435 13.75Z"
                  fill="white"
                />
              </svg>
              <span>Continue to Payment Options</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
