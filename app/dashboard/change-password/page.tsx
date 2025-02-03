"use client";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ChangePasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (values: ChangePasswordValues) => {
    setLoading(true);
    console.log("values = ", values);
    router.push("/login");
    setLoading(false);
  };

  return (
    <div className="border p-8 w-full sm:w-[80%] md:w-[50%] mx-auto">
      {loading ? (
        <div className="w-full">
          <LoadingSpinner />
          <h1 className="text-center text-2xl text-primary mt-10">
            Please Wait
          </h1>
        </div>
      ) : (
        <Formik
          initialValues={{
            newPassword: "",
            currentPassword: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors: Partial<ChangePasswordValues> = {};
            if (!values.currentPassword) {
              errors.currentPassword = "Current password is required.";
            }
            if (!values.newPassword) {
              errors.newPassword = "New password is required.";
            }
            if (values.newPassword !== values.confirmPassword) {
              errors.confirmPassword = "Passwords do not match.";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="space-y-4 mt-4">
                <h1 className="text-2xl font-semibold">Password Change</h1>
                <div>
                  <label
                    className="block font-semibold mb-1 text-black "
                    htmlFor="password"
                  >
                    New password (leave blank to leave unchanged)
                  </label>
                  <Field name="newPassword">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="newPassword"
                        className={`bg-white`}
                      />
                    )}
                  </Field>
                </div>

                <div>
                  <label
                    className="block font-semibold mb-1 text-black "
                    htmlFor="password"
                  >
                    Current password (leave blank to leave unchanged)
                  </label>
                  <Field name="currentPassword">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="currentPassword"
                        className={`bg-white`}
                      />
                    )}
                  </Field>
                </div>

                <div>
                  <label
                    className="block font-semibold mb-1 text-black "
                    htmlFor="password"
                  >
                    Confirm new password
                  </label>
                  <Field name="confirmPassword">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="confirmPassword"
                        className={`bg-white`}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className="mt-8">
                <button
                  className={"box-button disabled:bg-red-300"}
                  type="submit"
                  disabled={loading}
                >
                  Save changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ChangePassword;
