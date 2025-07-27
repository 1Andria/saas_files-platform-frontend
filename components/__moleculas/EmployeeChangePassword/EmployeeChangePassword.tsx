"use client";

import React, { Fragment, useState } from "react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-instance";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { useUserInfo } from "@/app/common/store/store";

export default function EmployeeChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const setUser = useUserInfo((state) => state.setUser);

  const router = useRouter();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !repeatNewPassword) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const token = getCookie("token");

      const res = await axiosInstance.patch(
        "/employees/change-password",
        {
          currentPassword,
          newPassword,
          repeatNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
      }
    } catch (e: any) {
      const message = e?.response?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else {
        toast.error(message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = getCookie("token");

      const res = await axiosInstance.delete("/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success("Account deleted successfully");
        deleteCookie("token");
        router.push("/auth/registration");
        setUser(null);
      } else {
        toast.error("Failed to delete account");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-[60px] flex items-center justify-center px-4">
      <form
        onSubmit={handlePasswordChange}
        className="flex-1 max-w-xl bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 space-y-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Change Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 mr-[5px] hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className="bg-red-600 ml-[5px] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Delete Account
          </button>
        </div>
      </form>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        as={Fragment}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Dialog.Panel className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-sm space-y-4 text-white">
            <Dialog.Title className="text-lg font-semibold">
              Confirm Account Deletion
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-400">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Dialog.Description>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDeleteAccount();
                  setIsConfirmOpen(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
