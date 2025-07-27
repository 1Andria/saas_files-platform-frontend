import { useUserInfo } from "@/app/common/store/store";
import SubscriptionModal from "@/components/__moleculas/SubscriptionModal/SubscriptionModal";
import React, { useState } from "react";

export default function SubscriptionPlanBtn() {
  const [showModal, setShowModal] = useState(false);
  const user = useUserInfo((state) => state.user);

  function normalizePlan(
    plan: string | undefined
  ): "Free" | "Basic" | "Premium" {
    switch (plan?.toLowerCase()) {
      case "free":
        return "Free";
      case "basic":
        return "Basic";
      case "premium":
        return "Premium";
      default:
        return "Free";
    }
  }

  return (
    <>
      <div className=" bg-gray-800 max-w-[540px] mt-[50px] mx-auto px-[16px] rounded-xl shadow-sm p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Subscription Plan
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          Manage Subscription
        </button>

        <SubscriptionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          currentPlan={normalizePlan(user?.subscription?.plan)}
        />
      </div>
    </>
  );
}
