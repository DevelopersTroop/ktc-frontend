"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AddTruckLoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full flex flex-col px-2 mx-auto text-center my-12 gap-6">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-4xl text-gray-600 font-medium">
          ADD your RIDE to the Gallery
        </h1>
        <p className="text-primary">
          *We can not accept stock OEM wheels in our fitment gallery.
        </p>
      </div>

      <div className="w-full lg:w-[45%] mx-auto">
        <h2 className="text-2xl font-bold text-gray-600 uppercase">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setIsSubmitting(true);
            console.log("values = ", values);
            if (values.email && values.password) {
              router.push("/");
            }
            setIsSubmitting(false);
          }}
        >
          {({ errors: formErrors, touched }) => (
            <Form className="mt-3 space-y-4">
              <div className="flex gap-3 items-center">
                <label
                  className="block font-semibold mb-1 text-gray-600 w-[20%] text-start"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="w-full">
                  <Field name="email">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        className={`bg-white ${
                          formErrors.email && touched.email
                            ? "border-red-500"
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
              </div>

              <div className="flex gap-3 items-center">
                <label
                  className="block font-semibold mb-1 text-gray-600 w-[20%] text-start "
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="w-full">
                  <Field name="password">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className={`bg-white ${
                          formErrors.password && touched.password
                            ? "border-primary"
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
              </div>

              <div className="text-end mr-0 sm:mr-10">
                <p className="text-sm text-black">
                  <Link
                    href="/forgot-password"
                    className=" hover:underline text-primary"
                  >
                    Forgot password?
                  </Link>
                </p>
              </div>

              <div className="flex gap-10 justify-end items-center mr-0 sm:mr-10">
                <div>
                  New Customer?{" "}
                  <Link href="/add-signup" className="text-primary font-medium">
                    Sign Up
                  </Link>
                </div>
                <Button
                  type="submit"
                  className=" uppercase bg-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : "Login"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTruckLoginPage;
