import { InputField } from "@/components/__atoms/InputField/InputField";
import { Label } from "@/components/__atoms/Label/Label";

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: boolean;
}

export const LabeledInput = ({
  label,
  icon,
  error,
  ...props
}: LabeledInputProps) => (
  <div>
    <Label text={label} />
    <InputField icon={icon} error={error} {...props} />
  </div>
);
