import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { LogOut } from "lucide-react";

function LogoutDialog() {
  return (
    <Dialog>
      <DialogTrigger
        className=" flex items-center gap-2 rounded-md text-black p-3 text-sm font-medium hover:bg-red-200 hover:text-red-700 md:flex-none md:justify-start md:p-2 md:px-3"
        onClick={() => {}}
      >
        <LogOut size={16}/>
        Logout
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to logout?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>

          <Button variant={"destructive"}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
