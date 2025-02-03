"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

const AddTruckSignUpPage: React.FC = () => {
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

      <div className="w-full md:w-[50%] xl:w-[40%] mx-auto md:outline outline-1 outline-black py-4 px-4 sm:px-12 bg-blue-50">
        <h2 className="text-2xl font-bold text-gray-600 uppercase">
          Create Account
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
                <Field name="email">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email Address"
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
                <Field name="password">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
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
                <Field name="confirmPassword">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm Password"
                      className={`bg-white ${
                        formErrors.confirmPassword && touched.confirmPassword
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
                {isSubmitting ? "Please wait..." : "Sign UP"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTruckSignUpPage;
