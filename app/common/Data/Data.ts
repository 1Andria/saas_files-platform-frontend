import { Crown, Star, Zap } from "lucide-react";

export const plans = [
  {
    name: "Free",
    value: "free",
    price: "0$",
    icon: Star,
    color: "gray",
    features: [
      "1 employees max",
      "10 files max",
      "Basic file sharing",
      "Email support",
    ],
  },
  {
    name: "Basic",
    value: "basic",
    price: "9.99$",
    icon: Zap,
    color: "blue",
    features: [
      "10 employees max",
      "100 files max",
      "Advanced file sharing",
      "Priority support",
      "File versioning",
    ],
  },
  {
    name: "Premium",
    value: "premium",
    price: "19.99$",
    icon: Crown,
    color: "yellow",
    features: [
      "Unlimited employees",
      "1000 (0.5$ per 1000+) storage",
      "Enterprise file sharing",
      "24/7 phone support",
      "Advanced analytics",
    ],
  },
];

export const getColorClasses = (color: string, isSelected: boolean) => {
  const base = "border border-gray-700";
  if (!isSelected) return base;
  if (color === "gray") return `${base} ring-2 ring-gray-500 bg-gray-700`;
  if (color === "blue") return `${base} ring-2 ring-blue-500 bg-blue-700`;
  if (color === "yellow") return `${base} ring-2 ring-yellow-500 bg-yellow-700`;
  return base;
};

export const getIconBg = (color: string) => {
  if (color === "gray") return "bg-gray-600";
  if (color === "blue") return "bg-blue-600";
  if (color === "yellow") return "bg-yellow-500";
  return "bg-gray-600";
};

export const getButtonClasses = (color: string, isSelected: boolean) => {
  if (isSelected) return "bg-gray-500 text-white cursor-not-allowed";
  if (color === "blue") return "bg-blue-600 hover:bg-blue-700 text-white";
  if (color === "yellow") return "bg-yellow-500 hover:bg-yellow-600 text-white";
  return "bg-gray-600 hover:bg-gray-700 text-white";
};
