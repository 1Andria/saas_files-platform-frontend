import { LabelProps } from "@/app/common/types/types";

export const Label = ({ text }: LabelProps) => (
  <label className="block text-sm font-medium text-gray-300 mb-2">{text}</label>
);
