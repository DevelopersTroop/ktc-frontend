"use client";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    setTimeout(() => {
      logout(true);
    }, 1000);
  }, []);
  return (
    <div className="w-full">
      <LoadingSpinner />
      <h1 className="mt-10 text-center text-2xl text-primary">Please Wait</h1>
    </div>
  );
};

export default Logout;
