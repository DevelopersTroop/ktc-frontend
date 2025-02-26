"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/globalRedux/store";
import { useRouter } from "next/navigation";
import { apiBaseUrl } from "@/app/utils/api";
import { removeUser, setUserDetails } from "@/app/globalRedux/features/user/user-slice";

const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.persisted.user);
  const refreshUser = async () => {
    const getUser = async () => {
      const response = await fetch(`${apiBaseUrl}/auth/current-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          // "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBaGFkIiwibGFzdE5hbWUiOiJIb3NzYWluIiwiZW1haWwiOiJhaGFkeHg5OUBnbWFpbC5jb20iLCJfaWQiOiI2Nzc2Mzc3OTcyNjg1ZjAwZmE3NTdiZWMiLCJ2ZXJpZmllZCI6ZmFsc2UsInJvbGUiOjIsImlhdCI6MTczNTk3NDUyOCwiZXhwIjoxNzY3NTEwNTI4LCJhdWQiOiJBbWFuaSBGb3JnZWQiLCJpc3MiOiJBbWFuaSBGb3JnZWQifQ.eHiKW52FGZ_qVJyeYQGIkSoGXJaOD2P3KFqmRWcb9JI`
        },
      });
      const { statusCode, data } = await response.json();
      if (statusCode === 200) {
        return data["user"];
      } else {
        return null;
      }
    };

    const refreshedUser = await getUser();
    if (refreshedUser) {
      dispatch(
        setUserDetails({
          userDetails: refreshedUser,
        })
      );
      return refreshedUser;
    } else {
      return null;
    }
  };
  const logout = (redirectToLoginPage: boolean = false) => {
    dispatch(removeUser());
    if (redirectToLoginPage) {
      router.push("/login");
    }
  };

  const signUp = async (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(`${apiBaseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...input, role: 1 }),
    });
    const { data } = await response.json();
    if (response.ok) {
      return data;
    }
  };

  return {
    refreshUser,
    logout,
    user:
      user.userDetails !== null
        ? { ...user?.userDetails, accessToken: user?.accessToken }
        : null,
    signUp,
  };
};

export default useAuth;
