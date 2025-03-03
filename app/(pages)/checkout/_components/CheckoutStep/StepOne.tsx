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
import { AlertCircle, CreditCard } from "lucide-react";
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
              <CreditCard />
              <span>Continue to Payment Options</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
