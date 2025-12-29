"use client";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import Container from "@/app/ui/container/container";
import React, { useState } from "react";

// Accordion component to display collapsible FAQ items
const Accordion = ({ title, content } : {
  title: string,
  content: string
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="border border-[#CFCFCF] rounded-lg">
      {/* Accordion header */}
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between text-start w-full py-[17px] px-5 md:px-10"
      >
        <span className="text-lg font-semibold text-[#210203]">{title}</span>
        {/* Icon to indicate accordion state */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={`w-5 h-5 transform transition-transform duration-200 ${
            accordionOpen ? "" : "rotate-180"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* Accordion content */}
      <div
        className={`text-start transition-all duration-300 ease-in-out overflow-hidden text-[#210203]text-base font-normal ${
          accordionOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="py-[17px] px-5 md:px-10 border-t border-[#CFCFCF]"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
};

// FAQ data categories - Production & Build Times
const faqs = [
  {
    id: "1",
    title: "What is the build time for custom wheels?",
    content:
      "<p>Custom wheels typically take 6–8 weeks to build from design to finish. Occasional delays may occur due to complexity or seasonal demand.</p><p class='pt-4' >Call us today! <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
  {
    id: "2",
    title: "How long do in-stock wheels take?",
    content:
      "<p>In-stock wheels are processed within 7–14 days, depending on fitment and assembly requirements.</p><p class='pt-4' >Call us today! <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
  {
    id: "3",
    title: "Is expedited production available?",
    content:
      "<p>Yes. Expedited production is available starting at $1,000–$1,500, reducing build time to as little as 10 business days for eligible orders.</p><p class='pt-4' >Call us today! <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
];


  // Main FAQs component
const FAQs: React.FC = () => {
  return (
    <>
      {/* Main FAQ content */}
      <Container>
        <div className="flex flex-col justify-center items-center gap-8 pt-2 sm:pt-4 ">
          {/* Header  */}
          <div className="w-full flex flex-col gap-4 text-[#210203]">
            <h1 className="text-2xl sm:text-4xl md:text-5xl text-center font-bold">
              Frequently Asked Questions
            </h1>
            {/* <p className="text-center text-base sm:text-xl font-normal">
              Welcome to Wheel tire USA’s official FAQ. This content is verified against <br/> our current website and policies, with no outdated or duplicate information.
            </p> */}
          </div>

          {/* Production & Build Times */}
          <div className="w-full flex flex-col items-center gap-5">
            {/* <div className="w-full text-xl sm:text-2xl font-bold text-center">
              <p>Production & Build Times</p>
            </div> */}
            <div className="w-full max-w-[864px] flex flex-col gap-2">
              {faqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  title={faq.title}
                  content={faq.content}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FAQs;
