import { useState } from "react";
import { axiosInstance } from "@/lib/axios-instance";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

export function CompanySignInForm({ goBack }: { goBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axiosInstance.post("/auth/sign-in", {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 w-full max-w-md mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-white mb-10">
        Company Sign In
      </h2>

      <div className="relative">
        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Company Email"
          required
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium py-2 rounded-lg flex items-center justify-center"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Redirecting...
          </span>
        ) : (
          "Sign In"
        )}
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
