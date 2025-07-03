"use client";
import { setUserDetails } from "@/app/globalRedux/features/user/user-slice";
import Container from "@/app/ui/container/container";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { apiBaseUrl } from "@/app/utils/api";
import { TextInput } from "@/components/shared/text-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type ChangeAccountDetailsValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const AccountDetails = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch();
  const form = useForm<ChangeAccountDetailsValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
  });

  const changeAccountApi = async (values: ChangeAccountDetailsValues) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/auth/profile/${user?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      });
      const data = await response.json();
      if (data.statusCode === 200) {
        dispatch(setUserDetails({ userDetails: data?.data?.user }));
        setSuccess(data.message || "Account updated successfully");
      } else {
        const errorData = data;
        throw new Error(errorData.message || "Failed to update account.");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="border-x border-b p-8">
        {success && (
          <Alert className="mt-4">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(changeAccountApi)}>
            <div className="flex flex-col min-[400px]:flex-row items-center gap-4">
              <TextInput control={form.control} name="firstName" label="First name" />
              <TextInput control={form.control} name="lastName" label="Last name" />
            </div>
            <TextInput
              control={form.control}
              name="email"
              label="Email"
              disabled
            />
            <div>
              <Button className="w-full text-lg font-semibold">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default AccountDetails;
