import { LucideIcon } from "lucide-react";
import { Control, UseFormRegister } from "react-hook-form";

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
  company?: {
    companyName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoStore {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}

export interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: "Free" | "Basic" | "Premium";
}

export interface FileUploadBoxProps {
  onUploadSuccess?: () => void;
}

export interface EmployeeCardProps {
  employee: any;
  onDelete: (id: string) => void;
}

export interface EditPermissionModalProps {
  open: boolean;
  onClose: () => void;
  fileId: string;
  currentEmails: string[];
  onSuccess: () => void;
}

export interface CountrySelectProps {
  control: Control<any>;
  name: string;
  label: string;
  countries: { label: string; value: string }[];
  error?: boolean;
}

export interface CompanyInfoCardProps {
  infoLength: number | string;
  infoText: string;
  Icon: LucideIcon;
  iconColorClass?: string;
  bgVariant?: "free" | "basic" | "premium";
}
