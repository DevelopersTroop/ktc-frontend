import Link from "next/link";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import StaticImage from "@/components/ui/static-image";

// Interface to define the structure of a payment provider
interface PaymentProvider {
  name: string;
  image: string;
  link: string;
  howItWorks: string;
  advantages: string[];
  creditRequired: { isTrue: boolean; content?: string };
  interestCharged: { isTrue: boolean; content?: string };
  repaymentOptions: string;
  minOrderAmount: string;
  earlyPayoff: { isTrue: boolean; content?: string };
  lateFees: { isTrue: boolean; content?: string };
}

// Array of payment providers with their details
export const paymentProviders: PaymentProvider[] = [
  {
    name: "PayTomorrow",
    image: "images/financing/PTLogo.png",
    link: "/pay-tomorrow",
    howItWorks:
      "Financing platform with multiple programs (prime installment loans; plus “no credit needed” lease-to-own via partners).",
    advantages: [
      "One application covers a wide credit spectrum; prime plans can include 0% or “same-as-cash” promos; quick soft-check prequal",
    ],
    creditRequired: {
      isTrue: true,
      content:
        "Soft check to see options; programs span prime to “no credit needed” LTO",
    },
    interestCharged: {
      isTrue: true,
      content:
        "Prime installment APRs typically 0%–16% (merchant/program dependent); LTO uses lease fees (not APR)",
    },
    repaymentOptions:
      "Prime: up to 48 months; LTO: typically 13 months (weekly/bi-weekly/semi-monthly)",
    minOrderAmount: "Merchant-specific (varies)",
    earlyPayoff: {
      isTrue: true,
      content:
        "no prepayment penalty on installment plans; LTO options include 90-day/“same-as-cash” style promos where offered",
    },
    lateFees: { isTrue: true, content: "May apply (program/issuer dependent)" },
  },
  {
    name: "PayPal",
    image: "images/financing/PayPal.png",
    link: "https://www.paypal.com/",
    howItWorks: "Revolving line of credit you can use at checkout with PayPal",
    advantages: [
      "No annual fee; 6-month special financing on eligible purchases",
    ],
    creditRequired: {
      isTrue: true,
      content: "credit check; subject to approval by Synchrony Bank",
    },
    interestCharged: {
      isTrue: true,
      content:
        "Variable purchase APR (around ~30% per current terms). Deferred-interest promo: “No Interest if paid in full in 6 months” on eligible amounts. Late fee may apply",
    },
    repaymentOptions: "Monthly minimum payments; you control payoff speed.",
    minOrderAmount:
      "Promo financing typically on $149+ purchases when checking out with PayPal",
    earlyPayoff: { isTrue: true, content: "you can pay any time" },
    lateFees: { isTrue: true, content: "May apply (see issuer terms)" },
  },
  {
    name: "Affirm",
    image: "images/financing/affirm.png",
    link: "https://www.affirm.com/",
    howItWorks: "Installment loans shown at checkout",
    advantages: [
      "No late fees or hidden fees; as low as 0% APR offers may be available.",
    ],
    creditRequired: {
      isTrue: true,
      content:
        "Credit check (soft check for eligibility; approval based on credit & other factors)",
    },
    interestCharged: {
      isTrue: true,
      content:
        "APR 0%–36% depending on credit, merchant & term; no fees (no late, annual, prepayment, or compounding fees)",
    },
    repaymentOptions:
      "Common terms: 3, 6, 12 months (sometimes longer); Pay-in-4 is 0% APR",
    minOrderAmount: "$50 cart floor standard (merchants may set higher)",
    earlyPayoff: {
      isTrue: true,
      content: "no penalty; you save any interest that hasn’t accrued",
    },
    lateFees: { isTrue: false, content: "None" },
  },
  {
    name: "Snap Finance",
    image: "images/financing/Snap-Finance-Logo.jpg",
    link: "https://snapfinance.co.uk/",
    howItWorks:
      "Lease-to-own financing (and in some cases bank/retail installment products)",
    advantages: [
      "Approvals for many credit profiles; quick decision; early purchase/100-day options to reduce total cost",
    ],
    creditRequired: {
      isTrue: false,
      content:
        "No credit needed” for LTO (income/banking data used); not all applicants approved",
    },
    interestCharged: {
      isTrue: true,
      content:
        "LTO includes lease fees (not interest); default plan 12–18 months; 100-Day early-ownership option available",
    },
    repaymentOptions:
      "Default LTO term 12–18 months; 100-Day early-ownership/early buyout options",
    minOrderAmount:
      "Often merchant-specific; some Snap flows list $150 minimum invoice; approvals commonly up to $5,000",
    earlyPayoff: {
      isTrue: true,
      content:
        "100-Day and other early purchase options can lower total lease cost",
    },
    lateFees: { isTrue: true, content: "May apply (per lease & state rules)" },
  },
];

// Component to render the payment providers table
const PaymentTable: React.FC = () => {
  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="">
          <tr>
            <th className="p-3 border"></th>
            {paymentProviders.map((provider) => (
              <th key={provider.name} className="p-3 border min-w-[180px]">
                <div className="flex flex-col gap-3 py-4">
                  <Link href={provider.link} target="_blank">
                    <StaticImage
                      src={provider.image}
                      alt={provider.name}
                      className="w-auto h-8 m-auto"
                    />
                  </Link>
                  <Link
                    href={provider.link}
                    target="_blank"
                    className="text-base font-semibold underline"
                  >
                    Learn More
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* How it works */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">How It Works</td>
            {paymentProviders.map((provider) => (
              <td
                key={provider.name}
                className="p-3 border text-base font-normal text-center"
              >
                {provider.howItWorks}
              </td>
            ))}
          </tr>

          {/* Advantages */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">Advantages</td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border">
                <ul className="list-none list-inside space-y-2">
                  {provider.advantages.map((adv, index) => (
                    <li
                      key={index}
                      className=" flex flex-row gap-2 text-base font-normal"
                    >
                      <IoCheckmarkOutline className="text-2xl text-green-500" />{" "}
                      <p className="w-full">{adv}</p>{" "}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* Credit Required */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">
              Credit Required
            </td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border text-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>
                    {provider.creditRequired.isTrue ? (
                      <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                    ) : (
                      <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                    )}
                  </p>{" "}
                  {provider.creditRequired.content}
                </div>
              </td>
            ))}
          </tr>

          {/* Interest Charged */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">
              Interest Charged
            </td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border text-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>
                    {provider.interestCharged.isTrue ? (
                      <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                    ) : (
                      <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                    )}
                  </p>{" "}
                  {provider.interestCharged.content}
                </div>
              </td>
            ))}
          </tr>

          {/* Repayment Options */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">
              Repayment Options
            </td>
            {paymentProviders.map((provider) => (
              <td
                key={provider.name}
                className="p-3 border text-base font-normal text-center"
              >
                {provider.repaymentOptions}
              </td>
            ))}
          </tr>

          {/* Minimum Order Amount */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold whitespace-nowrap">
              Minimum Order Amount
            </td>
            {paymentProviders.map((provider) => (
              <td
                key={provider.name}
                className="p-3 border text-base font-normal text-center"
              >
                {provider.minOrderAmount}
              </td>
            ))}
          </tr>

          {/* Early Payoff */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">Early Payoff</td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border text-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>
                    {provider.earlyPayoff.isTrue ? (
                      <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                    ) : (
                      <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                    )}
                  </p>{" "}
                  {provider.earlyPayoff.content}
                </div>
              </td>
            ))}
          </tr>

          {/* Late Fees */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">Late Fees</td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border text-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>
                    {provider.lateFees.isTrue ? (
                      <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                    ) : (
                      <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                    )}
                  </p>{" "}
                  {provider.lateFees.content}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
