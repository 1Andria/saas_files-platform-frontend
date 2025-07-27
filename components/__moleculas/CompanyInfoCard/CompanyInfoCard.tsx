import React from "react";
import { CompanyInfoCardProps } from "@/app/common/types/types";

export default function CompanyInfoCard({
  infoLength,
  infoText,
  Icon,
  iconColorClass = "text-blue-600",
  bgVariant,
}: CompanyInfoCardProps) {
  const bgClass =
    bgVariant === "premium"
      ? "bg-yellow-900/50 border-yellow-800"
      : bgVariant === "basic"
      ? "bg-blue-900/40 border-blue-800"
      : bgVariant === "free"
      ? "bg-gray-700 border-gray-600"
      : "bg-gray-800 border-gray-700";

  return (
    <div className={`w-full p-6 rounded-xl shadow-sm border ${bgClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{infoText}</p>
          <p className="text-2xl font-bold text-white">{infoLength}</p>
        </div>
        <Icon className={`w-8 h-8 ${iconColorClass}`} />
      </div>
    </div>
  );
}
