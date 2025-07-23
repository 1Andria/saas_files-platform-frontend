import { create } from "zustand";
import { CompanyEmailTypes } from "../types/types";
import { persist } from "zustand/middleware";

export const useCompanyEmail = create<CompanyEmailTypes>()(
  persist(
    (set) => ({
      companyEmail: "",
      setCompanyEmail: (value) => set(() => ({ companyEmail: value })),
    }),
    {
      name: "company-email-storage",
      partialize: (state) => ({ companyEmail: state.companyEmail }),
    }
  )
);
