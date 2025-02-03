"use client";

import { useParams } from "next/navigation";

const ViewOrder = () => {
  const { orderId } = useParams();

  return (
    <div className="w-full text-center">
      <h1>Order ID {orderId}</h1>
    </div>
  );
};

export default ViewOrder;
