"use client";

import React, { useState } from "react";
import { Plus, Users } from "lucide-react";
import { useUserInfo } from "@/app/common/store/store";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import InviteEmployeeModal from "../InviteEmployeeModal/InviteEmployeeModal";
import { axiosInstance } from "@/lib/axios-instance";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

export default function EmployeeTab() {
  const user = useUserInfo((state) => state.user);
  const fetchUser = useUserInfo((state) => state.fetchUser);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const token = getCookie("token");

  const handleDeleteEmployee = async (id: string) => {
    try {
      const resp = await axiosInstance.delete("/company/remove-employee", {
        data: { employeeId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.status === 200) {
        await fetchUser();
        toast.success("Deleted successfully");
      }
    } catch (e) {
      toast.error("Failed to delete employee");
    }
  };

  const employees = user?.employees ?? [];

  return (
    <div className="p-[16px] max-w-[1340px] mx-auto">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Employees ({employees.length})
          </h2>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center cursor-pointer space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Invite Employee</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee: any) => (
            <EmployeeCard
              key={employee._id}
              employee={employee}
              onDelete={handleDeleteEmployee}
            />
          ))}

          {employees.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No employees yet
              </h3>
              <p className="text-gray-400 mb-4">
                Start building your team by inviting employees
              </p>
              <button
                onClick={() => setShowInviteModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Invite First Employee
              </button>
            </div>
          )}
        </div>

        {showInviteModal && (
          <InviteEmployeeModal
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            fetchUser={fetchUser}
          />
        )}
      </div>
    </div>
  );
}
