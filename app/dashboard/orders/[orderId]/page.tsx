"use client";

import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { apiBaseUrl } from "@/app/utils/api";
import { camelCaseToWords } from "@/app/utils/string";
import useAuth from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductInfo {
  productId: string;
  info: {
    id: string;
    slug: string;
    image: string;
    title: string;
    maxInventory: number;
    inventoryStep: number;
    minInventory: number;
    sku: string;
    category: string;
    price: number;
    vehicleInformation: string;
    quantity: number;
    cartPackage: string;
  };
}

interface Address {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress: string;
  country: string;
  apartment: string;
  postalCode: string;
  state: string;
  city: string;
}

interface OrderData {
  _id: string;
  email: string;
  data: {
    productsInfo: ProductInfo[];
    address: Address;
    shippingMethod: {
      _id: string;
      title: string;
      amount: number;
      estimatedDelivery: string;
      description: string;
    };
    deliveryCharge: number;
    discount: number;
    totalCost: number;
    netCost: number;
    shippingAddress: Address;
    billingAddress: Address;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ViewOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {user} = useAuth();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/orders/${orderId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const result = await response.json();
        if (response.ok && result.response) {
          setOrder(result.data.order);
        } else {
          throw new Error(result.message || "Failed to fetch order details");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);


  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  console.log("order details ====   ", order);

  return (
    <div className="space-y-4">
      {order && (
        <>
          <div className="border-x border-b p-5 pr-10">
            <p className="text-base">
              <span className="bg-yellow-100">{order._id}</span> was placed on{' '}
              <span className="bg-yellow-100">{new Date(order.createdAt).toDateString()}</span> and is currently{' '}
              <span className="bg-yellow-100">{order.status}</span>.
            </p>
          </div>

          <div>
            <div className="border-x border-b p-5 pr-10 space-y-3">
              <h1 className="text-2xl font-semibold">Order details</h1>
              <div className="flex justify-between">
                <h2 className="text-sm uppercase font-bold">Product</h2>
                <h2 className="text-sm uppercase font-bold">Total</h2>
              </div>
            </div>

            <div className="border p-5 pr-10 space-y-3">
              {order.data.productsInfo.map((product, index) => (
                <div
                  key={`${product._id} ${index}`}
                  className="border-b pb-3 mb-3"
                >
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-gray-800">{product?.title}</p>
                      <p className="text-sm text-gray-600"> <span className="font-medium">SKU:</span> {product?.sku}</p>
                      <p className="text-sm text-gray-600"> <span className="font-medium">Category:</span> {product?.category?.title}</p>
                      {/* <p className="text-sm text-gray-600"><span className="font-medium">Vehicle Info:</span> {product?.vehicleInformation}</p> */}
                      <p className="text-sm text-gray-600"><span className="font-medium">Cart Package:</span> {product?.cartPackage}</p>
                      {/* <p className="text-sm text-gray-600"><span className="font-medium">Max Inventory:</span> {product?.maxInventory}</p> */}
                      {/* <p className="text-sm text-gray-600"><span className="font-medium">Inventory Step:</span> {product?.inventoryStep}</p> */}
                      {/* <p className="text-sm text-gray-600"><span className="font-medium">Min Inventory:</span> {product?.minInventory}</p> */}
                      <p className="text-sm text-gray-600"><span className="font-medium">Quantity:</span> {product?.quantity}</p>
                      <p className="text-sm text-gray-600"><span className="font-medium">Price:</span> {product?.msrp}</p>
                    </div>
                  </div>
                  <p className="text-right text-lg text-red-600">${(product?.msrp * product?.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border p-5 pr-10 space-y-3">
              <div className="flex justify-between space-x-2">
                <p className="text-lg uppercase font-bold"> Subtotal </p>
                <p className="text-lg text-red-600">
                ${order?.data?.totalCost}
                </p>
              </div>
              
              <div className="flex justify-between space-x-2">
                <p className="text-lg uppercase font-bold">discount</p>
                <p className="text-lg text-red-600">${order?.data?.discount}</p>
              </div>
              <div className="flex justify-between space-x-2">
                <p className="text-lg uppercase font-bold">Shipping Charge</p>
                <p className="text-lg text-red-600">${order.data.deliveryCharge}</p>
              </div>
              <div className="flex justify-between space-x-2">
                <p className="text-lg uppercase font-bold"> Total </p>
                <p className="text-lg text-red-600">
                ${order.data.netCost}
                </p>
              </div>
            </div>

          </div>
          <div>

            <div className="border-x border-b p-5 pr-10 space-y-3">
              <h1 className="text-2xl font-semibold">Shipping Address</h1>
              {order.data.shippingAddress &&
                Object.values(order.data.shippingAddress).some(value => value?.toString().trim()) ? (
                Object.entries(order.data.shippingAddress).map(
                  ([key, value]) =>
                    value?.toString().trim() && ( 
                        <p key={key} className="text-sm text-gray-600">
                        <span className="text-btext font-semibold"> {camelCaseToWords(key)}: </span> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                        </p>
                    )
                )
              ) : (
                <p className="text-sm text-gray-600">No Shipping address information available.</p>
              )}
                
            </div>

            <div className="border-x border-b p-5 pr-10 space-y-3">
              <h1 className="text-2xl font-semibold">Billing Address</h1>
              {order.data.billingAddress &&
                Object.values(order.data.billingAddress).some(value => value?.toString().trim()) ? (
                  Object.entries(order.data.billingAddress).map(
                    ([key, value]) =>
                      value?.toString().trim() && (
                        <p key={key} className="text-sm text-gray-600">
                          <span className="text-btext font-semibold">{camelCaseToWords(key)}: </span> {value}
                        </p>
                      )
                  )
                ) : (
                  <p className="text-sm text-gray-600">No Billing address information available.</p>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewOrder;