import { setSelectedDealerInfo } from "@/app/globalRedux/features/checkout/checkout-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCheckout } from "@/context/CheckoutContext";
import { Dealer } from "@/types/order";
import { StarIcon } from "lucide-react";
import { useDispatch } from "react-redux";

export const SelectAmaniDealerWithDiscount: React.FC<{
  setSelectedOption: () => void;
  handleOptionSelect: () => void;
  otherDealers: Dealer[];
  nearestDealer: Dealer | null;
  isLoading: boolean;
  checked: boolean;
  setStep: (step: number) => void;
}> = ({
  setSelectedOption,
  handleOptionSelect,
  otherDealers,
  nearestDealer,
  isLoading,
  checked,
  setStep,
}) => {
  /**
   * Redux Store & Dispatch Hook
   */
  const dispatch = useDispatch();
  const { selectedDealer } = useTypedSelector(
    (state) => state.persisted.checkout,
  );

  /**
   * Format Dealer Address
   */
  const formatDealerAddress = (dealer: any) => {
    return `${dealer.Addressee} - ${dealer["Address 1"]}, ${dealer.City}, ${dealer["State/Province"].text} ${dealer["Zip Code"]}`;
  };
  const { relocateMap } = useCheckout();
  return (
    <div
      onClick={handleOptionSelect}
      className={`flex cursor-pointer flex-col gap-y-5 rounded-lg border px-4 py-3 transition-all duration-200 hover:border-black lg:px-6 lg:py-5 ${
        checked ? "border-black" : "border-[#CFCFCF]"
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className={`flex items-center gap-4`}>
          <input
            type="radio"
            name="shipping-option"
            checked={checked}
            onChange={setSelectedOption}
            className="h-6 w-6 cursor-pointer accent-black ring-black checked:outline-none"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex w-full items-center justify-between gap-2">
            <p className="text-xl font-semibold lg:text-2xl">
              Authorized Amani Dealer
            </p>
            <div className="flex items-center gap-1">
              <div className="flex items-center *:fill-black">
                <StarIcon size={16} />
                <StarIcon size={16} />
                <StarIcon size={16} />
                <StarIcon size={16} />
                <StarIcon size={16} />
              </div>
              <span className="text-[14px] font-semibold text-[#210203]">
                (398)
              </span>
            </div>
          </div>
        </div>
        <p>With $200 Discount</p>
        <button
          onClick={relocateMap}
          className="flex items-center gap-2 font-semibold"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.0007 1.66675C6.31875 1.66675 3.33398 5.00223 3.33398 8.75008C3.33398 12.4686 5.46175 16.5104 8.78154 18.0621C9.55544 18.4238 10.4459 18.4238 11.2198 18.0621C14.5395 16.5104 16.6673 12.4686 16.6673 8.75008C16.6673 5.00223 13.6825 1.66675 10.0007 1.66675ZM10.0007 10.0001C10.9211 10.0001 11.6673 9.25389 11.6673 8.33342C11.6673 7.41294 10.9211 6.66675 10.0007 6.66675C9.08018 6.66675 8.33398 7.41294 8.33398 8.33342C8.33398 9.25389 9.08018 10.0001 10.0007 10.0001Z"
              fill="#210203"
            />
          </svg>
          <span className="underline">See on the map</span>
        </button>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border border-l-0 border-r-0">
          <AccordionTrigger className="text-[20px] font-semibold">
            Working hours
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <p className="text-muted">
              Contact this location to schedule your appointment.
            </p>
            <div className="flex items-center justify-between">
              <p className="text-[20px] font-semibold">Monday-Friday</p>
              <p className="text-lg text-muted">8:00 AM - 8:00 PM</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[20px] font-semibold">Saturday</p>
              <p className="text-lg text-muted">10:00 AM - 6:00 PM</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[20px] font-semibold">Sunday</p>
              <p className="text-lg text-muted">10:00 AM - 4:00 PM</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="py-sm space-y-3">
        <div className="flex flex-col items-start justify-between">
          <div className="max-w-lg space-y-1">
            <p className="text-sm text-gray-600">Discount</p>
            {/* <h2 className="font-bold text-2xl lg:text-[2rem]">$200.00*</h2> */}
            <p className="text-[32px] leading-[38px] text-[#210203]">
              <span className="text-[32px] font-bold text-[#210203]">
                $200.
              </span>
              <span className="text-xl font-bold text-[#210203]">00*</span>
            </p>
          </div>
          <div className="rounded-md py-2 text-lg">
            Does not include free mount, balance, install
          </div>
        </div>
        <p className="text-[14px] text-muted">
          Basic installation price calculated for tires and wheels only. Premium
          services may incur additional fees. Please contact installer for
          installation price related to brakes, suspension, and other
          components. Sales tax not included.
        </p>

        <div className="space-y-3 pt-2">
          <Select
            value={selectedDealer}
            onValueChange={(value) => {
              // Find the selected dealer from the list of other dealers
              const selectedDealer = otherDealers.find(
                (dealer) => dealer["Address Phone"] === value,
              );

              // Check if the selected dealer matches the nearest dealer
              const isNearestDealer =
                nearestDealer && nearestDealer["Address Phone"] === value;

              // Determine the selected dealer info
              const selectedDealerInfo =
                selectedDealer || (isNearestDealer ? nearestDealer : null);
              // Update the state with the selected dealer info if available
              if (selectedDealerInfo) {
                dispatch(setSelectedDealerInfo(selectedDealerInfo));
              }
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="h-12 w-full bg-white">
              <SelectValue
                placeholder={
                  isLoading ? "Loading dealers..." : "Select Authorized Dealer"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {nearestDealer && (
                <SelectItem
                  value={nearestDealer["Address Phone"]}
                  className="font-medium"
                >
                  {formatDealerAddress(nearestDealer)} (Nearest Dealer,
                  Distance: {nearestDealer.distance} miles)
                </SelectItem>
              )}
              {otherDealers.map((dealer) => (
                <SelectItem
                  key={dealer["Address Phone"]}
                  value={dealer["Address Phone"]}
                >
                  {formatDealerAddress(dealer)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <button
        onClick={(e) => {
          setSelectedOption();
          handleOptionSelect();
          setStep(3);
        }}
        className="px-6hover:bg-red-700 rounded-xs flex h-14 w-full items-center justify-center gap-2 bg-red-600 py-3 font-semibold text-white transition-colors disabled:bg-gray-400"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.916 12.9166C18.1493 12.9166 18.3327 13.1 18.3327 13.3333V14.1666C18.3327 15.55 17.216 16.6666 15.8327 16.6666C15.8327 15.2916 14.7077 14.1666 13.3327 14.1666C11.9577 14.1666 10.8327 15.2916 10.8327 16.6666H9.16602C9.16602 15.2916 8.04102 14.1666 6.66602 14.1666C5.29102 14.1666 4.16602 15.2916 4.16602 16.6666C2.78268 16.6666 1.66602 15.55 1.66602 14.1666V12.5C1.66602 12.0416 2.04102 11.6666 2.49935 11.6666H10.416C11.566 11.6666 12.4993 10.7333 12.4993 9.58329V4.99996C12.4993 4.54163 12.8743 4.16663 13.3327 4.16663H14.0327C14.6327 4.16663 15.1827 4.49163 15.4827 5.00829L16.016 5.94163C16.091 6.07496 15.991 6.24996 15.8327 6.24996C14.6827 6.24996 13.7493 7.18329 13.7493 8.33329V10.8333C13.7493 11.9833 14.6827 12.9166 15.8327 12.9166H17.916Z"
            fill="white"
          />
          <path
            d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z"
            fill="white"
          />
          <path
            d="M13.3327 18.3333C14.2532 18.3333 14.9993 17.5871 14.9993 16.6667C14.9993 15.7462 14.2532 15 13.3327 15C12.4122 15 11.666 15.7462 11.666 16.6667C11.666 17.5871 12.4122 18.3333 13.3327 18.3333Z"
            fill="white"
          />
          <path
            d="M18.3333 10.4417V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.1167 9.61667C18.2583 9.86667 18.3333 10.15 18.3333 10.4417Z"
            fill="white"
          />
          <path
            d="M10.9013 1.66663H4.74297C3.2513 1.66663 2.0013 2.73329 1.7263 4.14996H5.36797C5.68464 4.14996 5.93464 4.40829 5.93464 4.72496C5.93464 5.04163 5.68464 5.29163 5.36797 5.29163H1.66797V6.44163H3.83464C4.1513 6.44163 4.40964 6.69996 4.40964 7.01663C4.40964 7.33329 4.1513 7.58329 3.83464 7.58329H1.66797V8.73329H2.30964C2.6263 8.73329 2.88464 8.99163 2.88464 9.30829C2.88464 9.62496 2.6263 9.87496 2.30964 9.87496H1.66797V10.0666C1.66797 10.525 2.04297 10.9 2.5013 10.9H10.1263C10.9763 10.9 11.668 10.2083 11.668 9.35829V2.43329C11.668 2.00829 11.3263 1.66663 10.9013 1.66663Z"
            fill="white"
          />
          <path
            d="M1.72565 4.1499H1.60065H0.783984C0.467318 4.1499 0.208984 4.40824 0.208984 4.7249C0.208984 5.04157 0.467318 5.29157 0.783984 5.29157H1.54232H1.66732V4.74157C1.66732 4.54157 1.69232 4.34157 1.72565 4.1499Z"
            fill="white"
          />
          <path
            d="M1.54232 6.44165H0.783984C0.467318 6.44165 0.208984 6.69998 0.208984 7.01665C0.208984 7.33332 0.467318 7.58332 0.783984 7.58332H1.54232H1.66732V6.44165H1.54232Z"
            fill="white"
          />
          <path
            d="M1.54232 8.73328H0.783984C0.467318 8.73328 0.208984 8.99161 0.208984 9.30828C0.208984 9.62494 0.467318 9.87494 0.783984 9.87494H1.54232H1.66732V8.73328H1.54232Z"
            fill="white"
          />
        </svg>
        Ship to the Installer
      </button>
    </div>
  );
};
