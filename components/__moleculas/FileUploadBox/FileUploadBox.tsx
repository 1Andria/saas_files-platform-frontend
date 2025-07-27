"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-instance";

interface FileUploadBoxProps {
  onUploadSuccess?: () => void;
}

export default function FileUploadBox({ onUploadSuccess }: FileUploadBoxProps) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [visibility, setVisibility] = useState<"everyone" | "specific">(
    "everyone"
  );
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    setFiles(e.dataTransfer.files);
  };

  const addEmail = () => {
    const trimmed = emailInput.trim();
    if (trimmed && !emails.includes(trimmed)) {
      setEmails([...emails, trimmed]);
      setEmailInput("");
    }
  };

  const removeEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const handleUpload = async () => {
    if (!files || files.length === 0)
      return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("file", files[0]);

    if (visibility === "specific" && emails.length > 0) {
      emails.forEach((email) => {
        formData.append("visibleTo", email);
      });
    }

    try {
      setLoading(true);
      const token = getCookie("token");

      const resp = await axiosInstance.post("/file/upload-file", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (resp.status === 200 || resp.status === 201) {
        toast.success("File uploaded successfully");
        setFiles(null);
        setEmails([]);
        onUploadSuccess?.();
      } else {
        toast.error(resp.data.message || "Upload failed");
      }
    } catch (e: any) {
      if (Array.isArray(e?.response?.data?.message)) {
        e.response.data.message.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(e?.response?.data?.message || "Upload failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">File Upload</h2>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">
          Visibility
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="visibility"
              value="everyone"
              checked={visibility === "everyone"}
              onChange={() => setVisibility("everyone")}
            />
            <span className="text-white">Everyone</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="visibility"
              value="specific"
              checked={visibility === "specific"}
              onChange={() => setVisibility("specific")}
            />
            <span className="text-white">Specific emails</span>
          </label>
        </div>
      </div>

      {visibility === "specific" && (
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
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragOver
            ? "border-blue-500 bg-blue-900/20"
            : "border-gray-600 hover:border-gray-500"
        }`}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Upload Files</h3>
        <p className="text-sm text-gray-400 mb-6">
          Supported formats: CSV, XLS, XLSX
        </p>
        <input
          type="file"
          multiple
          accept=".csv,.xls,.xlsx"
          onChange={handleFileInputChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer inline-block"
        >
          Choose Files
        </label>

        {files && files.length > 0 && (
          <div className="mt-4 text-sm text-gray-300 flex items-center justify-center">
            <span>
              {files.length === 1
                ? `Selected: ${files[0].name}`
                : `${files.length} files selected`}
            </span>
            <button
              onClick={() => setFiles(null)}
              className="ml-4 text-red-400 hover:underline text-sm"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}
