"use client";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }, []);
  return (
    <div className="w-full">
      <LoadingSpinner />
      <h1 className="text-center text-2xl text-primary mt-10">Please Wait</h1>
    </div>
  );
};

export default Logout;
