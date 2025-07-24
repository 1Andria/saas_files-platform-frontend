import { useUserInfo } from "@/app/common/store/store";
import { deleteCookie } from "cookies-next";
import { Building2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SubscriptionBadge from "../SubscriptionBadge/SubscriptionBadge";

export default function DashboardHeader() {
  const user = useUserInfo((state) => state.user);
  const setUser = useUserInfo((state) => state.setUser);
  const router = useRouter();

  function onLogout() {
    setUser(null);
    deleteCookie("token");
    router.push("/auth/registration");
  }
  console.log(user);
  return (
    <>
      <div className="bg-gray-800 border-b border-gray-700">
        <header className="bg-gray-800 max-w-[1340px] mx-auto  px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {user?.companyName}
                </h1>
                <div className="flex items-center space-x-2">
                  <SubscriptionBadge
                    plan={user?.subscription?.plan ?? "free"}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogout}
                className="flex cursor-pointer items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
