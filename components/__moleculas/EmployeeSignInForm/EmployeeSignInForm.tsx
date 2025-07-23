import { useState } from "react";
import { axiosInstance } from "@/lib/axios-instance";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

export function EmployeeSignInForm({ goBack }: { goBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await axiosInstance.post("/auth/sign-in-employee", {
        email,
        password,
      });
      if (resp.status === 201) {
        toast.success("Logged in successfully");
        setCookie("token", resp.data.token, { maxAge: 60 * 60 });
        router.push("/dashboard");
        return;
      }
      toast.error(resp.data.message);
    } catch (e: any) {
      if (typeof e.response?.data?.message === "string") {
        toast.error(e.response.data.message);
      } else if (Array.isArray(e.response?.data?.message)) {
        e.response.data.message.forEach((msg: string) => toast.error(msg));
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 w-full max-w-md mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-white mb-10">
        Employee Sign In
      </h2>

      <div className="relative">
        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Employee Email"
          required
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-500 transition-colors text-white font-medium py-2 rounded-lg"
      >
        Sign In
      </button>

      <button
        type="button"
        onClick={goBack}
        className="text-sm cursor-pointer text-gray-400 hover:text-gray-200 underline block text-center"
      >
        ← Back
      </button>
    </form>
  );
}
