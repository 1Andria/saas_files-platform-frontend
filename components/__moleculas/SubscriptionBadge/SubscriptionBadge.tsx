import React from "react";
import { Crown, Star, BadgeCheck } from "lucide-react";

type SubscriptionPlan = "free" | "basic" | "premium";

interface Props {
  plan: SubscriptionPlan;
}

export default function SubscriptionBadge({ plan }: Props) {
  const styles = {
    premium: {
      icon: <Crown className="w-4 h-4 text-yellow-300" />,
      bg: "bg-yellow-900",
      text: "text-yellow-300",
      label: "Premium",
    },
    basic: {
      icon: <Star className="w-4 h-4 text-blue-300" />,
      bg: "bg-blue-900",
      text: "text-blue-300",
      label: "Basic",
    },
    free: {
      icon: <BadgeCheck className="w-4 h-4 text-green-300" />,
      bg: "bg-green-900",
      text: "text-green-300",
      label: "Free",
    },
  };

  const current = styles[plan];

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full ${current.bg}`}
    >
      <div className="flex items-center gap-1">
        {current.icon}
        <span className={`text-sm font-semibold ${current.text}`}>
          {current.label}
        </span>
      </div>
    </div>
  );
}
