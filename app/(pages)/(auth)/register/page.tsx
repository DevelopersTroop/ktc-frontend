"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const banner = {
    backgroundImage: `url('/images/registerhero.jpeg')`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "750px",
  };

  return (
    <div className="px-4 pt-2 md:p-0" style={banner}>
      <div className="w-full md:h-full flex flex-col md:flex-row py-8 px-4 md:p-0 bg-gray-400 bg-opacity-70 rounded-md md:bg-transparent">
        <div className="w-full md:w-[60%] text-white md:pt-2">
          <h1 className="text-6xl text-center uppercase md:block hidden">
            Get Access
          </h1>
          <h1 className="text-2xl text-center uppercase md:hidden block">
            Welcome Back
          </h1>
          <div className="w-full h-2 bg-primary"></div>
        </div>
        <div className="md:bg-gray-400 md:bg-opacity-90 w-full md:w-[40%] flex justify-center items-center">
          <div className="w-full shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] pt-2 md:px-12 md:py-20">
            <h2 className="text-2xl font-bold pb-4 border-b border-gray-200 text-white uppercase">
              Register
            </h2>
            <Formik
              initialValues={{ email: "", password: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setIsSubmitting(true);
                console.log("values = ", values);
                if (
                  values.email &&
                  values.password &&
                  values.password === values.confirmPassword
                ) {
                  router.push("/");
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

                  <div>
                    <label
                      className="block font-semibold mb-1 text-white "
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Field name="password">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type="password"
                          className={`bg-white ${
                            formErrors.password && touched.password
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      )}
                    </Field>
                    {formErrors.password && touched.password && (
                      <p className="mt-1 text-sm text-primary">
                        {formErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block font-semibold mb-1 text-white "
                      htmlFor="password"
                    >
                      Confirm Password
                    </label>
                    <Field name="confirmPassword">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type="password"
                          className={`bg-white ${
                            formErrors.confirmPassword &&
                            touched.confirmPassword
                              ? "border-primary"
                              : ""
                          }`}
                        />
                      )}
                    </Field>
                    {formErrors.confirmPassword && touched.confirmPassword && (
                      <p className="mt-1 text-sm text-primary">
                        {formErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full uppercase bg-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Create Account"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="flex my-4 justify-end items-center gap-1">
              <div className="w-full">
                <hr className="border-t border-gray-200" />
              </div>
              <p className="text-sm text-nowrap text-white">
                <Link href="/login" className=" hover:underline">
                  Already have an account?
                </Link>
              </p>
              <div className="w-full">
                <hr className="border-t border-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
