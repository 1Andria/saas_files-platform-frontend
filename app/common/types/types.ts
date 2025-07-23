import { UseFormRegister } from "react-hook-form";

export type CompanyEmailTypes = {
  companyEmail: string;
  setCompanyEmail: (value: string) => void;
};

export type FormValues = {
  companyName: string;
  email: string;
  password: string;
  country: string;
  industry: string;
};

export interface IndustrySelectProps {
  register: UseFormRegister<FormValues>;
  error?: boolean;
}

export interface LabelProps {
  text: string;
}
