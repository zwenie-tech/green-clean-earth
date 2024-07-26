// "use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUp, Upload } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormUploadPlant } from "@/app/my-profile/form_upload_plant"

export function DialogUploadPlant({token}:any) {
  
  return (
    <Dialog >
      <DialogTrigger asChild>
      <div 
        className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10 cursor-pointer">
        <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
          <p className="font-semibold text-xl">Upload plant</p>
          <ImageUp size={48} color="#6c7260" strokeWidth={1.75} />
        </div>
        <div className="px-6">
          <p className="text-base">വൃക്ഷത്തൈ സെൽഫി മത്സരം</p>
        </div>
      </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:h-[calc(100vh-74px)]" >
        <DialogHeader>
          <DialogTitle>Upload Plant</DialogTitle>
          <DialogDescription>
            {/* Provide details here */}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-full w-full p-2 rounded-md border">
            <FormUploadPlant />
        </ScrollArea>
        {/* <DialogFooter>
          <Button type="submit" className="bg-green-600 hover:bg-green-800">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}