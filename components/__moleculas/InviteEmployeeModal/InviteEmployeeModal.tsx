import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios-instance";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fetchUser: () => Promise<void>;
}

export default function InviteEmployeeModal({
  isOpen,
  onClose,
  fetchUser,
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const token = getCookie("token");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const resp = await axiosInstance.post(
        "/auth/invite-employee",
        { employeeEmail: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status === 201) {
        toast.success("Email sent successfully");
        await fetchUser();
        setEmail("");
        onClose();
      } else {
        toast.error(resp.data.message);
      }
    } catch (e: any) {
      const msg = e.response?.data?.message;
      if (typeof msg === "string") {
        toast.error(msg);
      } else if (Array.isArray(msg)) {
        msg.forEach((m: string) => toast.error(m));
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 border-none text-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-white">Invite Employee</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the employee's email to send an invite.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="grid gap-4 py-4"
        >
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              type="email"
              placeholder="john@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-gray-800 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="text-gray-300 hover:text-white"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Sending..." : "Send Invite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
