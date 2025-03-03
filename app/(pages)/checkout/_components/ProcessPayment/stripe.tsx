"use client";
import { useCheckout } from "@/app/context/CheckoutContext";
import { emptyCart } from "@/app/globalRedux/features/cart/cart-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { apiBaseUrl } from "@/app/utils/api";
import { toast } from "@/hooks/use-toast";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

export const useProcessStripePayment = (
    stripe: Stripe | null,
    elements: StripeElements | null,
    clientSecret: string
) => {
    const {
        selectedOptionTitle,
        shippingAddress,
        cartType,
        requestDealer,
        subTotalCost,
        discount,
        selectedDealer,
        selectedDealerInfo,
        orderInfo,
        billingAddress,
        setOrderSuccessData,
    } = useCheckout();
    const { products } = useTypedSelector((state) => state.persisted.cart);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    // Properly memoize productsData with dependencies
    const productsData = useMemo(() => {
        return {
            products: Object.values(products),
        };
    }, [products]);

    const processPayment = async (setStep?: (step: number) => void) => {
        if (!billingAddress?.email) {
            setError("Billing email is required");
            return;
        }

        if (!stripe || !elements) {
            setError("Stripe has not been properly initialized");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement('cardNumber')!, // Use CardElement properly
                    billing_details: {
                        name: "Customer Name",
                        email: billingAddress.email,
                    },
                },
            });

            if (error) {
                setError(error.message || "Payment failed");
                setLoading(false);
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                setSuccess(true);

                const orderData = {
                    data: {
                        orderInfo,
                        shippingAddress,
                        productsInfo: productsData.products,
                        discount,
                        cartType,
                        totalCost: subTotalCost.toFixed(2),
                        netCost: (subTotalCost - discount).toFixed(2),
                        selectedDealer,
                        selectedOptionTitle,
                        billingAddress,
                        requestedDealer: requestDealer,
                        selectedDealerInfo,
                    },
                    email: billingAddress.email,
                };

                // Create Order
                const orderResponse = await fetch(`${apiBaseUrl}/orders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                });

                const orderDataResponse = await orderResponse.json();

                if (!orderResponse.ok || !orderDataResponse?.data?.order?._id) {
                    throw new Error("Failed to create order");
                }

                const paymentData = {
                    email: billingAddress.email || shippingAddress?.email,
                    orderId: orderDataResponse.data.order._id,
                    paymentType: "Stripe",
                    currency: paymentIntent.currency,
                    amount: paymentIntent.amount / 100,
                    data: paymentIntent,
                };

                // Create Payment
                const paymentResponse = await fetch(`${apiBaseUrl}/payments/create-payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentData),
                });

                const paymentDataResponse = await paymentResponse.json();

                if (!paymentResponse.ok || !paymentDataResponse?.data) {
                    throw new Error("Payment record creation failed");
                }

                setOrderSuccessData(orderDataResponse.data.order.data);

                // dispatch(emptyCart());
                toast({
                    title: "Congrats",
                    description: "Order placed successfully",
                    variant: "default",
                });

                if (typeof setStep !== "undefined") setStep(5);
            }
        } catch (err) {
            console.error("Payment Processing Error:", err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to process payment",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        processPayment,
        error,
        loading,
        success,
    };
};
