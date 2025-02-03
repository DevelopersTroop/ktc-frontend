"use client";
import { useRouter } from "next/navigation";

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

const Order = () => {

  const router = useRouter();
  
  return (
    <div>
      <div className="hidden md:block ">
        <table className="min-w-full bg-white border-x border-b mx-auto p-8">
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {oldOrdersData.length > 0 ? (
              oldOrdersData.map((order) => (
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
                  <td className="py-5 px-4 border-b">
                    <button
                      className={"box-button disabled:bg-red-300"}
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
                    colSpan={5}
                    className="py-5 px-4 border-b text-center text-gray-500"
                  >
                    <div className="text-lg font-semibold">
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
      {oldOrdersData.length > 0 && (
        <div className="block md:hidden">
          {oldOrdersData.map((order) => (
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
                <span className="text-gray-500 font-semibold">Actions</span>
                <span>
                  <button
                    className={"box-button disabled:bg-red-300"}
                    onClick={() => router.push(`/dashboard/orders/${order.order_id.replace('#', '')}`)}
                  >
                    View
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
