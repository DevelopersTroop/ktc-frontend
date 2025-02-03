"use client";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const banner = {
    backgroundImage: `url('/images/forgothero.jpeg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "750px",
  };

  return (
    <div className="px-4 pt-2 md:p-0" style={banner}>
      <div className="w-full md:h-full flex flex-col md:flex-row py-8 px-4 md:p-0 bg-gray-400 bg-opacity-70 rounded-md md:bg-transparent">
        <div className="w-full md:w-[60%] text-white md:pt-2">
          <h1 className="text-2xl md:text-6xl text-center uppercase">
            Forgot Password
          </h1>
          <div className="w-full h-2 bg-primary"></div>
        </div>
        <div className="md:bg-gray-400 md:bg-opacity-90 w-full md:w-[40%] flex justify-center items-center">
          <div className="w-full shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] pt-2 md:px-12 md:py-20">
            <div className="text-center text-gray-200 py-5">
              <p>
                Don't worry, it happens to the best of us. We'll get you rolling
                on all 4 here shortly.
              </p>
            </div>

            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setIsSubmitting(true);
                console.log("values = ", values);
                if (values.email) {
                  router.push("/login");
                }
                setIsSubmitting(false);
              }}
            >
              {({ errors: formErrors, touched }) => (
                <Form className="mt-6 space-y-4">
                  <div>
                    <label
                      className="block font-semibold mb-1 text-white"
                      htmlFor="email"
                    >
                      Email address
                    </label>
                    <Field name="email">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type="email"
                          className={`bg-white ${
                            formErrors.email && touched.email
                              ? "border-primary"
                              : ""
                          }`}
                        />
                      )}
                    </Field>
                    {formErrors.email && touched.email && (
                      <p className="mt-1 text-sm text-primary">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full uppercase bg-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Send Reset Email"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
