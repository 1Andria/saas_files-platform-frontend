"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText, Settings } from "lucide-react";
import { EmployeeTab, useEmployeeDashboardTab } from "@/app/common/store/store";

const tabs = [
  { id: "files", label: "My Files", icon: FileText },
  { id: "profile", label: "Profile", icon: Settings },
] as const;

export default function EmployeeDashboardNavigation() {
  const { activeTab, setActiveTab } = useEmployeeDashboardTab();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");

    if (tabFromUrl && tabs.some((t) => t.id === tabFromUrl)) {
      setActiveTab(tabFromUrl as "files" | "profile");
    } else {
      const defaultTab: EmployeeTab = "files";
      setActiveTab(defaultTab);
      router.replace(`?tab=${defaultTab}`);
    }
  }, [searchParams, setActiveTab, router]);

  const handleTabClick = (tabId: "files" | "profile") => {
    setActiveTab(tabId);
    router.push(`?tab=${tabId}`);
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-[16px] max-w-[1340px] mx-auto">
      <div className="max-w-[1340px] mx-auto flex space-x-8">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
              activeTab === id
                ? "border-blue-600 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium text-sm">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
