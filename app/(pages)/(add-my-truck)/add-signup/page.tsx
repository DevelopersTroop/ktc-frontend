"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userRegister } from "../../(auth)/register/register";
import { setAccessToken, setRefreshToken, setUserDetails } from "@/app/globalRedux/features/user/user-slice";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AddTruckSignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<
    {
      message: string;
      field: string;
      location: string;
    }[]
  >([]);
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: "",
    isSuccess: false,
  });
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

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

        {errors.length > 0 &&
          errors.map((error) => (
            <Alert variant="destructive" key={error.message} className="mt-4">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ))}
        {success.isSuccess && (
          <Alert className="mt-4">
            <AlertDescription>{success.message}</AlertDescription>
          </Alert>
        )}

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setIsLoadingRegister(true);
            userRegister({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
              role: 2,
            })
              .then((response) => {
                const { statusCode, data, errors } = response;
                if (data && statusCode === 201) {
                  setSuccess({
                    isSuccess: true,
                    message: "Please check your email to verify your account",
                  });
                  setErrors([]);
                  // dispatch(setAccessToken({ accessToken: data.accessToken }));
                  // dispatch(
                  //   setRefreshToken({ refreshToken: data.refreshToken })
                  // );
                  // dispatch(setUserDetails({ userDetails: data.user }));
                } else if (errors) {
                  setErrors(errors);
                  setSuccess({ isSuccess: false, message: "" });
                }
              })
              .finally(() => {
                window.scrollTo(0, 0);
                setIsLoadingRegister(false);
              });
          }}
        >
          {({ errors: formErrors, touched }) => (
            <Form className="mt-6 space-y-4">
              <div>
                <Field name="firstName">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      type="firstname"
                      placeholder="First Name"
                      className={`bg-white ${
                        formErrors.firstName && touched.firstName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  )}
                </Field>
                {formErrors.firstName && touched.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Field name="lastName">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      type="lastname"
                      placeholder="Last Name"
                      className={`bg-white ${
                        formErrors.lastName && touched.lastName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  )}
                </Field>
                {formErrors.lastName && touched.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
              <div>
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
                  <p className="mt-1 text-sm text-red-500">
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
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full uppercase bg-primary"
                disabled={isLoadingRegister}
              >
                {isLoadingRegister ? "Please wait..." : "Sign UP"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTruckSignUpPage;
