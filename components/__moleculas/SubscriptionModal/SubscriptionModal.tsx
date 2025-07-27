"use client";

import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { X, Check } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-instance";
import { getCookie } from "cookies-next";
import { useUserInfo } from "@/app/common/store/store";
import { SubscriptionModalProps } from "@/app/common/types/types";
import {
  getButtonClasses,
  getColorClasses,
  getIconBg,
  plans,
} from "@/app/common/Data/Data";

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
}) => {
  const [loadingPlan, setLoadingPlan] = useState<"basic" | "premium" | null>(
    null
  );
  const fetchUser = useUserInfo((state) => state.fetchUser);

  const handleCheckout = async (plan: "basic" | "premium") => {
    try {
      setLoadingPlan(plan);

      const token = getCookie("token");

      const resp = await axiosInstance.post(
        "/stripe/create-checkout",
        { plan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status === 201 || resp.status === 200) {
        toast.success("Redirecting to Stripe Checkout...");
        await fetchUser();
        if (resp.data?.url) {
          window.location.href = resp.data.url;
          return;
        }
        toast.error("Invalid checkout URL");
      } else {
        toast.error(resp.data.message || "Failed to create Stripe session");
      }
    } catch (e: any) {
      if (typeof e.response?.data?.message === "string") {
        toast.error(e.response.data.message);
      } else if (Array.isArray(e.response?.data?.message)) {
        e.response.data.message.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error("Something went wrong during checkout");
      }
    } finally {
      setLoadingPlan(null);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const successParam = params.get("success");

    if (successParam === "true") {
      fetchUser();
      toast.success("Upgraded successfully");

      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      window.history.replaceState({}, "", url.pathname + url.search);
    } else if (successParam === "false") {
      toast.error("Something went wrong");
    }
  }, []);

  const handleDowngrade = async () => {
    try {
      const token = getCookie("token");

      const resp = await axiosInstance.patch(
        "/company/subscription-downgrade",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status === 200 || resp.status === 201) {
        toast.success("Downgraded to Free plan successfully");
        await fetchUser();
        onClose();
      } else {
        toast.error(resp.data.message || "Failed to downgrade subscription");
      }
    } catch (e: any) {
      if (typeof e.response?.data?.message === "string") {
        toast.error(e.response.data.message);
      } else if (Array.isArray(e.response?.data?.message)) {
        e.response.data.message.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error("Something went wrong during downgrade");
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="bg-gray-900  text-white rounded-2xl shadow-lg w-full max-w-5xl max-h-[95vh]  p-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Typography variant="h5" className="font-bold text-white">
              Choose Your Plan
            </Typography>
            <Typography variant="body2" className="text-gray-400 mt-1">
              Upgrade or downgrade your subscription
            </Typography>
          </div>
          <IconButton onClick={onClose}>
            <X className="text-gray-400 w-5 h-5" />
          </IconButton>
        </div>

        <div className="flex justify-between gap-6 flex-wrap md:flex-nowrap">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = currentPlan === plan.name;

            return (
              <div
                key={plan.name}
                className={`w-full md:w-[32%] rounded-2xl p-6 transition-all ${getColorClasses(
                  plan.color,
                  isSelected
                )}`}
              >
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${getIconBg(
                      plan.color
                    )}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-3xl font-bold">{plan.price}</p>
                  {plan.name !== "Free" && (
                    <p className="text-gray-400">/month</p>
                  )}
                  {isSelected && (
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-green-700 text-white rounded-full text-sm font-medium">
                        Current Plan
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3  mb-6 text-sm text-gray-200">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  disabled={
                    isSelected || loadingPlan === plan.name.toLowerCase()
                  }
                  onClick={() => {
                    if (plan.name === "Free") {
                      handleDowngrade();
                    } else {
                      handleCheckout(
                        plan.name.toLowerCase() as "basic" | "premium"
                      );
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${getButtonClasses(
                    plan.color,
                    isSelected || loadingPlan === plan.name.toLowerCase()
                  )}`}
                >
                  {isSelected
                    ? "Current Plan"
                    : loadingPlan === plan.name.toLowerCase()
                    ? plan.name === "Free"
                      ? "Downgrading..."
                      : "Redirecting..."
                    : `Choose ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gray-800 rounded-xl text-sm text-gray-300">
          <h4 className="font-semibold text-white mb-2">Need help choosing?</h4>
          <p>
            To test the payment, choose any card payment method and enter the
            following test details: Card Number:
            <strong>4242 4242 4242 4242</strong>| Expiration Date:{" "}
            <strong>12/34</strong>| CVC: <strong>123</strong>| You can use any
            fake email and cardholder name — no real data is required.
          </p>
        </div>
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;
