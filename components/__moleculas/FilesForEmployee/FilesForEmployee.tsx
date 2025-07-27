"use client";

import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios-instance";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { FileText, Trash2, Pencil } from "lucide-react";
import { useUserInfo } from "@/app/common/store/store";
import EditPermissionsModal from "../EditPermissionsModal/EditPermissionsModal";

interface FileItem {
  fileName: string;
  url: string;
  size: number;
  mimeType: string;
  _id: string;
  fileId: string;
  uploadedBy: string;
  whoCanSee?: string[];
}

interface Props {
  setFetcherRef?: (fn: () => void) => void;
}

export default function FilesForEmployee({ setFetcherRef }: Props) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const handleEdit = (
    fileId: string,
    emails: { _id: string; employeeEmail: string }[] = []
  ) => {
    const emailList = emails.map((e) => e.employeeEmail);
    setSelectedFileId(fileId);
    setSelectedEmails(emailList);
    setEditOpen(true);
  };

  const { user } = useUserInfo();

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const resp = await axiosInstance.get("/file/employee/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.status === 200) {
        setFiles(resp.data.files || []);
      } else {
        toast.error("Failed to fetch files");
      }
    } catch (err: any) {
      toast.error("Error fetching files");
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      const token = getCookie("token");
      const resp = await axiosInstance.delete(`/file/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.status === 200) {
        toast.success("File deleted successfully");
        await fetchFiles();
      } else {
        toast.error("Failed to delete file");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error deleting file");
    }
  };

  useEffect(() => {
    fetchFiles();
    if (setFetcherRef) {
      setFetcherRef(fetchFiles);
    }
  }, []);

  console.log(files);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">Files for You</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-400">No files available</p>
      ) : (
        <ul className="space-y-4">
          {files.map((file) => (
            <li
              key={file._id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <FileText className="text-blue-400 w-6 h-6" />
                <div>
                  <p className="text-white font-semibold">{file.fileName}</p>
                  <p className="text-gray-400 text-sm">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${file.fileId}`}
                  download={file.fileName}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Download
                </a>

                {user?._id === file.uploadedBy && (
                  <>
                    <button
                      onClick={() =>
                        handleEdit(file._id, file.whoCanSee as any)
                      }
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-md flex items-center cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFile(file._id)}
                      className="hover:bg-red-700 bg-red-600 cursor-pointer text-white px-3 py-2 rounded-md flex items-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {editOpen && (
        <EditPermissionsModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          fileId={selectedFileId}
          currentEmails={selectedEmails}
          onSuccess={fetchFiles}
        />
      )}
    </div>
  );
}
