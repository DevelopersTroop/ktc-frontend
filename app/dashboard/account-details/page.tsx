"use client";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";

const AccountDetails = () => {

  return (
    <div className="border p-8 w-full sm:w-[80%] md:w[50%] mx-auto">
      <Formik
        onSubmit={(values) => {
          console.log(values)
        }}
        initialValues={{
          firstName: "dev",
          lastName: "dev",
          email: "dev@gmail.com",
        }}
      >
        {() => (
          <Form className="mt-6 space-y-4">

          <div className="flex flex-row gap-5 w-full">
            <div className="w-1/2">
              <label className="block font-semibold mb-1 text-black" htmlFor="email">
                First Name
              </label>
              <Field name="firstName">
                  {({ field }: any) => (
                  <Input
                    {...field}
                    type="firstName"
                    className={`bg-white`}
                  />
                  )}
              </Field>
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1 text-black" htmlFor="lastName">
                Last Name
              </label>
              <Field name="lastName">
                  {({ field }: any) => (
                  <Input
                    {...field}
                    type="lastName"
                    className={`bg-white`}
                  />
                  )}
              </Field>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-black" htmlFor="email">
              Email address
            </label>
            <Field name="email">
                {({ field }: any) => (
                <Input
                  {...field}
                  type="email"
                  className={`bg-white`}
                />
                )}
            </Field>
          </div>

        </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountDetails;
