"use client";
import { useCompanyEmail } from "@/app/common/store/store";
import { Button } from "@/components/__atoms/Button/Button";
import { LabeledInput } from "@/components/__moleculas/LabledInput/LabledInput";
import { axiosInstance } from "@/lib/axios-instance";
import { setCookie } from "cookies-next";
import { BadgeCheck, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OtpCodeBody() {
  const router = useRouter();
  const companyEmail = useCompanyEmail((s) => s.companyEmail);
  const [otpCode, setOtpCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    if (!companyEmail) return;

    const lastResendTime = sessionStorage.getItem("last_otp_resend");

    if (!lastResendTime) {
      sessionStorage.setItem("last_otp_resend", Date.now().toString());
      setTimer(180);
      setCanResend(false);
      return;
    }

    const secondsElapsed = Math.floor(
      (Date.now() - Number(lastResendTime)) / 1000
    );
    const remaining = 180 - secondsElapsed;

    if (remaining > 0) {
      setTimer(remaining);
      setCanResend(false);
    } else {
      setTimer(0);
      setCanResend(true);
    }
  }, [companyEmail]);

  useEffect(() => {
    if (!companyEmail || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          sessionStorage.removeItem("last_otp_resend");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, companyEmail]);

  const handleResend = async () => {
    try {
      const resp = await axiosInstance.post("auth/resend-verification-code", {
        email: companyEmail,
      });
      if (resp.status === 201) {
        sessionStorage.setItem("last_otp_resend", Date.now().toString());
        setTimer(180);
        setCanResend(false);
        toast.success("Verification code resent successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Failed to resend code");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await axiosInstance.post("auth/verify-email", {
        email: companyEmail,
        otpCode: Number(otpCode),
      });
      if (resp.status === 201) {
        toast.success("Email verified successfully");
        setCookie("token", resp.data.token, { maxAge: 60 * 60 });
        router.push("/dashboard");
      } else {
        toast.error("Invalid code");
      }
    } catch (e: any) {
      if (typeof e.response.data.message === "string") {
        toast.error(e.response.data.message);
      }
      if (Array.isArray(e.response.data.message)) {
        toast.error(e.response.data.message.map((m: string) => m).join("\n"));
      }
    }
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="flex items-center justify-center bg-[#1f2937] min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Verify Company Email
            </h1>
            <p className="text-gray-400 mt-2">
              Check your email and enter OTP code to verify
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <LabeledInput
              label="Email Address"
              value={companyEmail}
              icon={<Mail />}
              placeholder="example@gmail.com"
              readOnly
            />
            <LabeledInput
              label="OTP Code"
              value={otpCode}
              maxLength={6}
              type="number"
              icon={<BadgeCheck />}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter 6-digit code"
              required
            />
            <Button type="submit" children="Verify Email" />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>
                Time remaining:{" "}
                <span className="font-medium">{formatTime(timer)}</span>
              </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className={`text-xs font-medium px-2 py-1 rounded transition-colors ml-4 ${
                  canResend
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
