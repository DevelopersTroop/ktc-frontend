"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import useAuth from "../../_hooks/useAuth";
import { userLogin } from "./login";
import { setAccessToken, setRefreshToken, setUserDetails } from "@/app/globalRedux/features/user/user-slice";
import { Alert, AlertDescription } from "@/components/ui/alert";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState<
    {
      name: string;
      message: string;
    }[]
  >([]);
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: "",
    isSuccess: false,
  });

  const dispatch = useDispatch();
  const {user} = useAuth();

  // const form = useForm({
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //     rememberMe: true
  //   }
  // })

  useEffect(() => {
    if (user) {


      router.push("/dashboard/orders");
    }
  }, [user, router]);

  const banner = {
    backgroundImage: `url('/images/loginhero.jpeg')`,
    backgroundPosition: "center",
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
              Login
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
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setIsSubmitting(true);
                userLogin({ email: values.email, password: values.password })
            .then(async (data) => {
              if (Array.isArray(data)) {
                setSuccess({ isSuccess: false, message: "" });
                return setErrors(data);
              }
              setErrors([]);
              setSuccess({ isSuccess: true, message: "Login successful" });
              dispatch(setAccessToken({ accessToken: data.token.accessToken }));
              dispatch(
                setRefreshToken({ refreshToken: data.token.refreshToken })
              );
              dispatch(setUserDetails({ userDetails: data.user }));

              router.push("/dashboard");
            })
            .finally(() => {
              setIsSubmitting(false);
            });
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
                  <div className="text-end">
                    <p className="text-sm text-white">
                      <Link
                        href="/forgot-password"
                        className=" hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full uppercase bg-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Sign In"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="flex my-4 justify-end items-center gap-1">
              <div className="w-full">
                <hr className="border-t border-gray-200" />
              </div>
              <p className="text-sm text-nowrap text-white">
                <Link href="/register" className=" hover:underline">
                  Don't have an account?
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
