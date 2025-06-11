import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { apiURL } from "@/app/requestsapi/request";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function EditClub() {
  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const [category, setCategory] = useState('');
  const token = Cookies.get("adtoken");
  useEffect(() => {
    async function fetchdata() {
      if(token){
        const retrievedData = JSON.parse(localStorage.getItem("clubs") || "[]");
        const itemdata = retrievedData.find((item: { id  : string; }) => item.id == coId)
        
      setCategory([itemdata][0].name);
      }
    }
    fetchdata();
  }, [coId, token]);

  const form = useForm();

  async function onSubmit() {
    
    const formdata = {
      clubName: category
    };

    if (token) {
      try {
        const response = await axios.post(`${apiURL}/adminEdit/modifyClubs?recordId=${coId}`, formdata, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success && response.status !== 203) {
          toast({
            title: "Data Successfully Updated.",
            description: "",
          });

          setTimeout(() => {
            window.history.back();
          }, 1800);
        } else {
          toast({
            variant: "destructive",
            title: "Oops, Something went wrong!",
            description: "Please try again...",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary">
          <Edit />
          <span className="text-base">Edit</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl overflow-y-scroll max-h-[98%]">
        <DialogHeader>
          <DialogTitle>Edit Club</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="mb-4">
                <label className="form-label">Club Name</label>
                <input
                  className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-3">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
