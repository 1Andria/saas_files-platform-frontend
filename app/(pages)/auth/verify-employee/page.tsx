"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-instance";
import { setCookie } from "cookies-next";

export default function VerifyEmployee() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!token) {
      toast.error("Invalid verification link");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/verify-employee", {
        token,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Verified successfully");
        setCookie("token", res.data.token, { maxAge: 60 * 60 });
        router.push("/dashboard");
      } else {
        toast.error(res.data?.message || "Verification failed");
      }
    } catch (e: any) {
      if (typeof e.response?.data?.message === "string") {
        toast.error(e.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-md p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">
          Set Your Password
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Please create your password to complete verification.
        </p>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-6"
        />

        <Button
          onClick={handleVerify}
          disabled={loading}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify and Continue"
          )}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Not the right link?{" "}
            <button
              onClick={() => router.push("/auth/registration")}
              className="text-blue-500 hover:underline ml-1"
            >
              Sign Up Instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
