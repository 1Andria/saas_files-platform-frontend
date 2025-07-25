"use client";

import React from "react";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-instance";
import { getCookie } from "cookies-next";
import { useUserInfo } from "@/app/common/store/store";

interface FileCardProps {
  file: {
    _id: string;
    fileId: string;
    fileName: string;
    size: number;
    createdAt: string;
    uploadedBy?: {
      employeeEmail?: string;
    };
  };
  showUploader?: boolean;
}

export default function FileCard({ file, showUploader }: FileCardProps) {
  const downloadUrl = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${file.fileId}`;
  const formattedDate = new Date(file.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const fetchUser = useUserInfo((state) => state.fetchUser);

  const handleDeleteFile = async (id: string) => {
    const token = getCookie("token");

    try {
      const resp = await axiosInstance.delete(`/company/delete-file/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.status === 200) {
        await fetchUser();
        toast.success("File deleted successfully");
      }
    } catch (e) {
      toast.error("Failed to delete file");
    }
  };

  const handleDelete = () => handleDeleteFile(file._id);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white underline underline-offset-2 block"
            >
              {file.fileName}
            </a>
            <p className="text-sm text-gray-400">
              {Math.ceil(file.size / 1024)} KB • {formattedDate}
            </p>
            {showUploader && file.uploadedBy && (
              <p className="text-sm text-gray-500 mt-1">
                Uploaded by: {file.uploadedBy.employeeEmail}
              </p>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="text-red-400 hover:text-red-600 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
