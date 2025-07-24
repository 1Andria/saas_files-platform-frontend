"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDashboardTab } from "@/app/common/store/store";
import { Tab } from "../DashboardNavigation/DashboardNavigation";

export default function DashboardTabsSyncer() {
  const pathname = usePathname();
  const setActiveTab = useDashboardTab((state) => state.setActiveTab);

  useEffect(() => {
    const tab = pathname.split("/").pop() as Tab;

    const validTabs: Tab[] = ["overview", "employees", "files", "profile"];
    if (validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [pathname, setActiveTab]);

  return null;
}
