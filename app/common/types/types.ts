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

type SubscriptionPlan = "free" | "basic" | "premium";

interface User {
  _id: string;
  companyName?: string;
  companyEmail?: string;
  companyCountry?: string;
  companyIndustry?: string;
  isActive: boolean;
  companyProfilePicture?: string;
  subscription?: {
    plan: SubscriptionPlan;
    activatedAt: string | null;
  };
  employees?: string[];
  files: string[];
  employeeEmail?: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
