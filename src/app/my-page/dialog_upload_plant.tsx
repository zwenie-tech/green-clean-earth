"use client";
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { FormUploadActivities } from "./form_upload_activities"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormUploadPlant } from "./form_upload_plant"

export function DialogUploadPlant({token}:any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-800 mt-4 mb-8"><Upload className="mr-2 h-4 w-4" />Upload Plants</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:h-[calc(100vh-74px)]" >
        <DialogHeader>
          <DialogTitle>Upload Plant</DialogTitle>
          <DialogDescription>
            {/* Provide details here */}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-full w-full p-2 rounded-md border">
            <FormUploadPlant token={token} />
        </ScrollArea>
        {/* <DialogFooter>
          <Button type="submit" className="bg-green-600 hover:bg-green-800">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
