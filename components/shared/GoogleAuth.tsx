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

export default function GoogleAuth() {
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
      dispatch(setAccessToken({ accessToken }));
      dispatch(setRefreshToken({ refreshToken }));
      dispatch(setUserDetails({ userDetails: parsedUser }));
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/signin-with-google`;
  };

  return (
    <div className='mt-5'>
      <button
        onClick={handleGoogleLogin}
        className='flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-all'
      >
        <img src='/google-icon.webp' alt='Google' className='w-5 h-5' />
        {loading ? (
          <p>Authenticating, please wait...</p>
        ) : (
          <span>Sign in with Google</span>
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
