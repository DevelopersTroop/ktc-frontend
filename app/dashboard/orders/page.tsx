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
    <div className="">
      <div className="hidden md:block">
        <table className="mx-auto min-w-full border-x border-b bg-white p-8">
          <thead>
            <tr className="text-start">
              <th className="text-bold border-b px-4 py-5 text-start uppercase">
                Order
              </th>
              <th className="text-bold border-b px-4 py-5 text-start uppercase">
                Date
              </th>
              <th className="text-bold border-b px-4 py-5 text-start uppercase">
                Status
              </th>
              <th className="text-bold border-b px-4 py-5 text-start uppercase">
                Total
              </th>
              <th className="text-bold border-b px-4 py-5 text-start uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {oldOrdersData.length > 0 ? (
              oldOrdersData.map((order) => (
                <tr key={order.order_id}>
                  <td className="relative border-b px-4 py-5 text-red-600">
                    <div
                      className="w-[66px] overflow-hidden text-ellipsis whitespace-nowrap hover:cursor-pointer"
                      title={order.order_id}
                    >
                      {order.order_id}
                    </div>
                    <div
                      className="absolute hidden rounded bg-gray-800 py-1 text-sm text-white shadow-md hover:block"
                      style={{ top: "-30px", left: "0", whiteSpace: "nowrap" }}
                    >
                      {order.order_id}
                    </div>
                  </td>

                  <td className="border-b px-4 py-5">{order.date}</td>
                  <td className="border-b px-4 py-5">{order.status}</td>
                  <td className="border-b px-4 py-5">
                    <span className="text-red-600">
                      {" "}
                      {order.total} for {order.items} items{" "}
                    </span>
                  </td>
                  <td className="border-b px-4 py-5">
                    <button
                      className={"box-button disabled:bg-red-300"}
                      onClick={() =>
                        router.push(
                          `/dashboard/orders/${order.order_id.replace("#", "")}`,
                        )
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
                    className="border-b px-4 py-5 text-center text-gray-500"
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
              className="mb-4 rounded-lg border border-gray-200 bg-white p-2 text-sm shadow-sm min-[380px]:p-4 min-[380px]:text-base"
            >
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-500">Order</span>
                <span className="font-bold text-red-600">{order.order_id}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-500">Date</span>
                <span>{order.date}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-500">Status</span>
                <span>{order.status}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-500">Total</span>
                <span>
                  <span className="text-red-600">{order.total}</span> for{" "}
                  {order.items} items
                </span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-500">Actions</span>
                <span>
                  <button
                    className={"box-button disabled:bg-red-300"}
                    onClick={() =>
                      router.push(
                        `/dashboard/orders/${order.order_id.replace("#", "")}`,
                      )
                    }
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
