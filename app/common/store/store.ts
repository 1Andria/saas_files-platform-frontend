import { create } from "zustand";
import { CompanyEmailTypes, UserInfoStore } from "../types/types";
import { persist } from "zustand/middleware";
import { getCookie } from "cookies-next";
import { axiosInstance } from "@/lib/axios-instance";

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
  fetchUser: async () => {
    try {
      const token = getCookie("token");
      if (!token) return;

      const resp = await axiosInstance.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: resp.data });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },
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
