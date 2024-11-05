"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { FormUploadActivities } from "@/app/user-dash-home/my-activities/form_upload_activities";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DialogUploadActivities({ token }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10 cursor-pointer transition-all hover:scale-105">
          <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
            <p className="font-semibold text-xl">Upload activity</p>
            <Upload size={48} color="#6c7260" strokeWidth={1.75} />
          </div>
          <div className="px-6">
            <p className="text-base"></p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl ">
        <DialogHeader>
          <DialogTitle>Upload Activities hello</DialogTitle>
          <DialogDescription>{/* Provide details here */}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-full w-full">
          <FormUploadActivities token={token} />
        </ScrollArea>
        <DialogFooter>
          {/* <Button type="submit" className="bg-primary hover:bg-primary/85">Submit</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
