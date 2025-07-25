import React from "react";
import CompanyInfoCard from "../CompanyInfoCard/CompanyInfoCard";
import { FileText, Users, Crown, Star, HandCoins } from "lucide-react";
import { useUserInfo } from "@/app/common/store/store";

export default function CompaniInfoFullGrid() {
  const user = useUserInfo((state) => state.user);

  const planConfig = {
    free: {
      Icon: HandCoins,
      iconColorClass: "text-gray-400",
      bgVariant: "free",
    },
    basic: {
      Icon: Star,
      iconColorClass: "text-blue-400",
      bgVariant: "basic",
    },
    premium: {
      Icon: Crown,
      iconColorClass: "text-yellow-400",
      bgVariant: "premium",
    },
  } as const;

  const plan = user?.subscription?.plan ?? "free";
  const { Icon, iconColorClass, bgVariant } = planConfig[plan];

  return (
    <div className="w-ful  mt-[40px] max-w-[1340px] mx-auto flex justify-between gap-[40px]">
      <CompanyInfoCard
        infoLength={user?.employees?.length ?? 0}
        infoText="Total Employees"
        Icon={Users}
        iconColorClass="text-blue-600"
      />
      <CompanyInfoCard
        infoLength={user?.files?.length ?? 0}
        infoText="Total Files"
        Icon={FileText}
        iconColorClass="text-green-600"
      />
      <CompanyInfoCard
        infoLength={plan.charAt(0).toUpperCase() + plan.slice(1)}
        infoText="Subscription"
        Icon={Icon}
        iconColorClass={iconColorClass}
        bgVariant={bgVariant}
      />
    </div>
  );
}
