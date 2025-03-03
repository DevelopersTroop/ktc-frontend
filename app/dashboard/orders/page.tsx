"use client";
import useAuth from "@/app/(pages)/_hooks/useAuth";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { apiBaseUrl } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const oldOrdersData = [
  {
    order_id: "#174849",
    date: "November 18, 2024",
    status: "Cancelled",
    total: "$0.00",
    items: 0,
  },
  {
    order_id: "#174850",
    date: "November 19, 2024",
    status: "On hold",
    total: "$2,345.67",
    items: 8,
  },
];

interface ProductInfo {
  price: number;
  quantity: number;
  // Add other fields as per your product info structure
}

interface OrderData {
  order_id: string;
  date: string;
  status: string;
  total: string;
  discount: number | string;
  net_total: number | string;
  items: number | string;
}

interface OrderListResult {
  statusCode: number;
  response: boolean;
  message: string;
  data: {
    total: number;
    pages: number;
    orders: any;
  };
}

const Order = () => {

  const {user} = useAuth();
  const [orderData, setOrderData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
    (async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const orderListResponse = await fetch(
          `${apiBaseUrl}/orders/personal-list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              email: user.email,
              all: true,
              sort: [
                {
                  whom: "updatedAt",
                  order: "desc",
                },
              ],
            }),
          }
        );

        if (!orderListResponse.ok) {
          throw new Error("Failed to fetch orders");
        }

        const orderListResult: OrderListResult = await orderListResponse.json();

        setLoading(false);

        if (orderListResult?.statusCode === 200) {
          const orders: OrderData[] = orderListResult?.data?.orders.map(
            (order) => {

              const items = order?.data?.productsInfo.reduce(
                (sum: number, product: ProductInfo) => sum + product.quantity,
                0
              );

              return {
                order_id: `#${order._id}`,
                date: new Date(order.createdAt).toLocaleDateString(),
                status: order.status,
                total: `$${order?.data?.totalCost.toFixed(2)}`,
                discount: `$${order.data?.discount.toFixed(2)}` || 0,
                net_total: `$${order?.data?.netCost.toFixed(2)}` || 0,
                items,
              };
            }
          );
          setOrderData(orders);
        } else {
          setError(orderListResult.message || "Failed to fetch orders");
        }
      } catch (error) {
        // console.error("Error fetching orders:", error);
        setLoading(false);
        setError(error.message || "An unexpected error occurred");
      }
    })();
  }, []);

  if(loading) return <LoadingSpinner />
  if (error) return <p>Error: {error}</p>;


  return (
    <div>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border-x border-b p-8">
          <thead>
            <tr className="text-start">
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Order
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Date
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Status
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Total
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Discount
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Net Amount
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData.length > 0 ? (
              orderData.map((order) => (
                <tr key={order.order_id}>
                  <td className="py-5 px-4 border-b text-red-600 relative">
                    <div
                      className="w-[66px] overflow-hidden whitespace-nowrap text-ellipsis hover:cursor-pointer"
                      title={order.order_id}
                    >
                      {order.order_id}
                    </div>
                    <div
                      className="absolute hidden bg-gray-800 text-white text-sm py-1 rounded shadow-md hover:block"
                      style={{ top: "-30px", left: "0", whiteSpace: "nowrap" }}
                    >
                      {order.order_id}
                    </div>
                  </td>

                  <td className="py-5 px-4 border-b">{order.date}</td>
                  <td className="py-5 px-4 border-b">{order.status}</td>
                  <td className="py-5 px-4 border-b">
                    <span className="text-red-600">
                      {" "}
                      {order.total} for {order.items} items{" "}
                    </span>
                  </td>
                  <td className="py-5 px-4 border-b">{order.discount}</td>
                  <td className="py-5 px-4 border-b">{order.net_total}</td>
                  <td className="py-5 px-4 border-b">
                    <button
                      className={"py-2 px-8 bg-primary text-white disabled:bg-red-300 font-semibold rounded-xl hover:bg-red-700"}
                      onClick={() =>
                        router.push(`/dashboard/orders/${order.order_id.replace('#', '')}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td
                    colSpan={7}
                    className="py-5 px-4 border-b text-center text-gray-500"
                  >
                    <div className="text-lg font-semibold text-center">
                      You have not made any orders yet.
                    </div>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View for Mobile */}
      {orderData.length > 0 ? (
        <div className="block md:hidden">
          {orderData.map((order) => (
            <div
              key={order.order_id}
              className="bg-white text-sm min-[380px]:text-base border border-gray-200 rounded-lg mb-4 p-2 min-[380px]:p-4 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Order</span>
                <span className="text-red-600 font-bold">{order.order_id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Date</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Status</span>
                <span>{order.status}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Total</span>
                <span>
                  <span className="text-red-600">{order.total}</span> for{" "}
                  {order.items} items
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Discount</span>
                <span>{order.discount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Net Amount</span>
                <span>{order.net_total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Actions</span>
                <span>
                  <button
                    className={"py-2 px-8 bg-primary text-white disabled:bg-red-300 font-semibold rounded-xl hover:bg-red-700"}
                    onClick={() => router.push(`/dashboard/orders/${order.order_id.replace('#', '')}`)}
                  >
                    View
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="block md:hidden text-lg font-semibold text-center text-gray-500">
          You have not made any orders yet.
        </div>
      )}
    </div>
  );
};

export default Order;
