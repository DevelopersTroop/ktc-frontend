"use client";
import { removeUser } from "@/app/globalRedux/features/user/user-slice";
import Container from "@/app/ui/container/container";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { apiBaseUrl } from "@/app/utils/api";
import { TextInput } from "@/components/shared/text-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type ChangePasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);
  const { user } = useAuth();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const handleLogout = () => {
    dispatch(removeUser());
    router.push("/login");
  };

  const changePasswordApi = async (values: ChangePasswordValues) => {
    try {
      setLoading(true);
      setErrors([]);
      const response = await fetch(`${apiBaseUrl}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });
      if (response.ok) {
        handleLogout();
      } else {
        const errorData = await response.json();
        // setErrors(errorData.errors);
        // throw new Error(errorData.errors || "Failed to change password.");
        if (Array.isArray(errorData.errors)) {
          setErrors(errorData.errors);
        } else {
          setErrors([
            { message: errorData.message || "Failed to change password." },
          ]);
        }

        throw new Error(errorData.message || "Failed to change password.");
      }
    } catch (err) {
      // setError((err as Error).message);
      setErrors((prevErrors) => [
        ...prevErrors,
        { message: (err as Error).message || "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (values: ChangePasswordValues) => {
    if (values.newPassword !== values.confirmPassword) {
      setErrors([
        { message: "New password and confirm password do not match." },
      ]);
      return;
    }
    changePasswordApi(values);
  };

  return (
    <Container>
      <div className="border-x border-b p-8">
        {loading ? (
          <div className="w-full">
            <LoadingSpinner />
            <h1 className="mt-10 text-center text-2xl text-primary">
              Please Wait
            </h1>
          </div>
        ) : (
          <>
            {errors.length > 0 &&
              errors.map((error) => (
                <Alert
                  variant="destructive"
                  key={error.message}
                  className="mt-4"
                >
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              ))}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
              >
                <TextInput
                  control={form.control}
                  type="password"
                  name="currentPassword"
                  label="Current Password (leave blank to leave unchanged)"
                />
                <TextInput
                  control={form.control}
                  type="password"
                  name="newPassword"
                  label="New Password (leave blank to leave unchanged)"
                />
                <TextInput
                  control={form.control}
                  type="password"
                  name="confirmPassword"
                  label="Confirm new Password"
                />
                <Button className="w-full text-lg font-semibold">Save</Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </Container>
  );
};

export default ChangePassword;
