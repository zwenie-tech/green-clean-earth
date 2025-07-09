"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { apiURL } from "@/app/requestsapi/request";

export function ApprovalForm() {
  const pathname = usePathname();
  const router = useRouter();
  const userId = pathname.split("/")[3];
  const token = Cookies.get("adtoken");
  const { toast } = useToast();

  const handleApprove = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/adminEdit/approveCoordinator?recordId=${userId}`,
        { isApproved: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success && response.status !== 203) {
        toast({
          title: "Coordinator approved successfully.",
        });

        // Navigate to listing page after short delay
        setTimeout(() => {
          router.push("/admin/unapproved"); // 🔁 Update with your actual listing route
        }, 1200);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Approval failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary">
          <Edit />
          <span className="text-base">Approve</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Registration</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this registration?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleApprove}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
