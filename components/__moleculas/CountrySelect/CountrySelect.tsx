"use client";

import { Globe } from "lucide-react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { Label } from "@/components/__atoms/Label/Label";
import { useId } from "react";
import { CountrySelectProps } from "@/app/common/types/types";

export function CountrySelect({
  control,
  name,
  label,
  countries,
  error = false,
}: CountrySelectProps) {
  const id = useId();

  return (
    <div>
      <Label text={label} />
      <div className="relative z-10">
        <Globe className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none z-100" />
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              instanceId={id}
              {...field}
              options={countries}
              value={countries.find((c) => c.value === field.value)}
              onChange={(val) => field.onChange(val?.value)}
              placeholder="Select Country"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#374151",
                  borderColor: error
                    ? "#ef4444"
                    : state.isFocused
                    ? "#3b82f6"
                    : "#4B5563",
                  boxShadow: state.isFocused
                    ? `0 0 0 2px ${error ? "#ef4444" : "#3b82f6"}`
                    : "none",
                  paddingLeft: "2.2rem",
                  "&:hover": {
                    borderColor: error ? "#ef4444" : "#3b82f6",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#3b82f6" : "transparent",
                  color: state.isFocused ? "#ffffff" : "#f9fafb",
                  cursor: "pointer",
                  "&:active": {
                    backgroundColor: "#2563eb",
                  },
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#ffffff",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#9CA3AF",
                }),
                input: (base) => ({
                  ...base,
                  color: "#ffffff",
                }),
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
