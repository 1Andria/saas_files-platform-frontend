"use client";

import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-instance";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/app/common/store/store";

export default function DeleteCompanyBtn() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();
  const setUser = useUserInfo((state) => state.setUser);

  const handleDeleteCompany = async () => {
    try {
      const token = getCookie("token");

      const res = await axiosInstance.delete("/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success("Company account deleted successfully");
        deleteCookie("token");
        router.push("/auth/registration");
        setUser(null);
      } else {
        toast.error("Failed to delete company account");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        className="bg-red-600 mx-[16px] mt-[16px] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Delete Company Account
      </button>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        as={Fragment}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Dialog.Panel className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-sm space-y-4 text-white">
            <Dialog.Title className="text-lg font-semibold">
              Confirm Company Deletion
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-400">
              Are you sure you want to delete your company account? This action
              is irreversible.
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
                  await handleDeleteCompany();
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
    </>
  );
}
