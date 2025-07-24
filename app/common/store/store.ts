import { create } from "zustand";
import { CompanyEmailTypes, UserInfoStore } from "../types/types";
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

export const useUserInfo = create<UserInfoStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export type Tab = "overview" | "employees" | "files" | "profile";

interface DashboardTabState {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const useDashboardTab = create<DashboardTabState>((set) => ({
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
