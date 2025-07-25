"use client";

import React from "react";
import { FileText } from "lucide-react";
import { useUserInfo } from "@/app/common/store/store";
import FileCard from "../FileCard/FileCard";

export default function FilesTab() {
  const user = useUserInfo((state) => state.user);
  const files = user?.files ?? [];

  return (
    <div className="p-[16px] max-w-[1340px] mx-auto">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            All Files ({files.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file: any) => (
            <FileCard key={file._id} file={file} showUploader />
          ))}

          {files.length === 0 && (
            <div className="col-span-full text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No files uploaded
              </h3>
              <p className="text-gray-400">
                Files uploaded by employees will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
