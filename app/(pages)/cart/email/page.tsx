"use client";
import { setSaveEmailShown } from "@/app/globalRedux/features/cart/cart-products-Save-email-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { triggerEvent } from "@/app/utils/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { setTrackingEmail } from "@/lib/tracker";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

// Validation schema for the email input field
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

// Component to render the email page for saving the cart
const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const dispatch = useDispatch(); // Redux dispatch function
  const router = useRouter(); // Next.js router for navigation
  const { user } = useAuth(); // Get the authenticated user
  const { email } = useTypedSelector((state) => state.persisted.saveEmail);

  // Redirect to the cart page if the user is already logged in
  useEffect(() => {
    if (user || email) {
      router.push("/cart");
    }
  }, [user, router, email]);

  // Function to handle "Continue as Guest" button click
  const handleContinueAsGuest = () => {
    triggerEvent("cart_continue_as_guest", {});
    dispatch(setSaveEmailShown(""));
    router.push("/cart");
  };

  return (
    <div className="w-full max-w-[650px] mx-auto shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] px-8 py-8 my-20">
      {/* Page heading */}
      <h2 className="text-2xl font-bold pb-4 border-b border-gray-200">
        Drop your email and we'll save your cart for you.
      </h2>
      {/* Formik form for email input */}
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setIsSubmitting(true);
          if (values.email) {
            setTrackingEmail(values.email);
            dispatch(setSaveEmailShown(values.email));
            router.push("/cart");
          }
          setIsSubmitting(false);
        }}
      >
        {({ errors: formErrors, touched }) => (
          <Form className="mt-6 space-y-4">
            {/* Email input field */}
            <div>
              <label className="block font-semibold mb-1" htmlFor="email">
                Email address<span className="text-red-500">*</span>
              </label>
              <Field name="email">
                {({ field }: any) => (
                  <Input
                    {...field}
                    type="email"
                    className={
                      formErrors.email && touched.email ? "border-red-500" : ""
                    }
                  />
                )}
              </Field>
              {formErrors.email && touched.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            {/* Submit button */}
            <Button
              type="submit"
              className="w-full uppercase"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Save your cart"}
            </Button>

            <div className="space-y-2 text-center">
              <button onClick={handleContinueAsGuest} className="underline">
                Continuse As Guest
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;
