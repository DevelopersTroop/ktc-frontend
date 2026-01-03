"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "@/app/globalRedux/features/user/user-slice";
import { apiBaseUrl } from "@/app/utils/api";
import { ImSpinner2 } from "react-icons/im";

export default function FacebookAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userDetails = searchParams.get("userDetails");

    if (accessToken && refreshToken && userDetails) {
      setLoading(true);
      const parsedUser = JSON.parse(decodeURIComponent(userDetails));
      console.log(parsedUser);
      dispatch(setAccessToken({ accessToken }));
      dispatch(setRefreshToken({ refreshToken }));
      dispatch(setUserDetails({ userDetails: parsedUser }));
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/signin-with-facebook`;
  };

  return (
    <div className='mt-5'>
      <button
        onClick={handleGoogleLogin}
        className='flex items-center gap-2 w-14 h-14 border rounded-lg hover:bg-gray-50 transition-all'
      >
        {loading ? (
          <ImSpinner2 className='w-6 h-6 m-auto animate-spin text-[#DB1922]' />
        ) : (
          <img src='/facebook.png' alt='Google' className='w-6 h-6 m-auto' />
        )}
      </button>

      {searchParams.get("error") && (
        <p className='mt-4 text-red-500'>
          Authentication failed. Please try again.
        </p>
      )}
    </div>
  );
}
