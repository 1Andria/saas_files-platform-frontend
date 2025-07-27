"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Modal } from "@mui/material";
import { axiosInstance } from "@/lib/axios-instance";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { EditPermissionModalProps } from "@/app/common/types/types";

export default function EditPermissionsModal({
  open,
  onClose,
  fileId,
  currentEmails,
  onSuccess,
}: EditPermissionModalProps) {
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>(currentEmails);
  const [loading, setLoading] = useState(false);

  console.log(emails);

  useEffect(() => {
    if (open) {
      setEmails(currentEmails);
      setEmailInput("");
    }
  }, [open, currentEmails]);

  const addEmail = () => {
    const trimmed = emailInput.trim();
    if (trimmed && !emails.includes(trimmed)) {
      setEmails((prev) => [...prev, trimmed]);
      setEmailInput("");
    }
  };

  const removeEmail = (email: string) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");

      const resp = await axiosInstance.patch(
        `/file/${fileId}/permissions`,
        { visibleTo: emails },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (resp.status === 200) {
        toast.success("Permissions updated successfully");
        onSuccess();
        onClose();
      } else {
        toast.error(resp.data.message || "Update failed");
      }
    } catch (e: any) {
      if (Array.isArray(e?.response?.data?.message)) {
        e.response.data.message.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(e?.response?.data?.message || "Update failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-6 rounded-lg max-w-lg w-full shadow-lg outline-none">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Edit Visibility</h2>
          <X className="text-white cursor-pointer" onClick={onClose} />
        </div>

        <div className="mb-6">
          <div className="flex space-x-2 mb-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addEmail())
              }
              className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white"
              placeholder="Enter email and press Enter"
            />
            <button
              onClick={addEmail}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {emails.map((email, idx) => (
              <span
                key={idx}
                className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1"
              >
                <span>{email}</span>
                <X
                  className="w-4 h-4 ml-2 cursor-pointer"
                  onClick={() => removeEmail(email)}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
