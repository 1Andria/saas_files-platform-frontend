import { useUserInfo } from "@/app/common/store/store";
import { deleteCookie } from "cookies-next";
import { User, Building2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployeeDashboardHeader() {
  const user = useUserInfo((state) => state.user);
  const setUser = useUserInfo((state) => state.setUser);
  const router = useRouter();
  const logOut = () => {
    deleteCookie("token");
    setUser(null);
    router.push("/auth/registration");
  };
  return (
    <header className="bg-gray-800 max-w-[1340px] px-[16px] mx-auto   py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white text-[16px]">
              {user?.employeeEmail?.split("@")[0]}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Building2 className="w-4 h-4" />
              <span>{user?.company?.companyName}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={logOut}
            className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
