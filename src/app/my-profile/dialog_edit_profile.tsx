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
import { FormEditProfile } from "./form_edit_profile"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DialogEditProfile({token}:any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-primary bg-transparent hover:bg-primary/5">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] h-[calc(100vh-74px)]" >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            {/* Provide details here */}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-full w-full p-2 rounded-md border">
            <FormEditProfile/>
        </ScrollArea>
        {/* <DialogFooter>
          <Button type="submit" className="bg-green-600 hover:bg-green-800">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
