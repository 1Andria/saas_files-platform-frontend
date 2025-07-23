"use client";

import { IndustrySelectProps } from "@/app/common/types/types";
import { Label } from "@/components/__atoms/Label/Label";
import { Briefcase } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

export function IndustrySelect({
  register,
  error = false,
}: IndustrySelectProps) {
  return (
    <div>
      <Label text="Industry" />
      <div className="relative">
        <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <select
          {...register("industry")}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 transition-colors ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          }`}
        >
          <option value="" hidden>
            Select Industry
          </option>
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="retail">Retail</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}
