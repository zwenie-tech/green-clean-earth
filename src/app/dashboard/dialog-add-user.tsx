"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LinkIcon, Copy } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { baseURL } from "@/app/requestsapi/request";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { FaUpload } from "react-icons/fa";
import Cookies from 'js-cookie';

export function DialogAddUser() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DialogAddUserfn />
    </Suspense>
  );
}
function DialogAddUserfn() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const referral_code = Cookies.get('cord_refcode');
  const id = searchParams.get("id");
  const message = `
 
🥦ഗ്രീൻ ക്ലീൻ കേരള  ഹരിത  മത്സരങ്ങളിൽ  പങ്കെടുക്കാൻ ..........
🥦താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു  രജിസ്റ്റർ ചെയ്തതിനുശേഷം യൂസർ നെയ്മും പാസ്സ്‌വേർഡും  ക്രിയേറ്റ് ചെയ്തു  സബ്മിറ്റ് ചെയ്യുക.
👇🏼
${baseURL}/user-register?id=${parseInt(id!)}&ref=${referral_code}
🥦
 സംശയങ്ങൾക്ക്
🥦
9645 9645 92
🥦
Web: www.GreenCleanEarth.org 
Youtube /fb/insta: Green Clean Kerala
Whatsapp/Telegram : 9645 9645 92
Mail: GreenCleanKerala@gmail.Com
Follow the link to join GreenCleanEarth mission.
`;

  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        
      <label className="btn btn-primary flex align-items-center bg-light-green rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-light-gray hover:z-10"style={{width:'350px',height: '70px',boxShadow:'1px 4px 5px 3px #00000040'}} >
    <div
     style={{ width: '60px',height: '70px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center',}}
    >
    <FaUpload />

   </div>
    <div className="pt-5 p-1 text-lg md:text-2xl md:pt-5 md:pr-3">Invite Users</div>
    
  </label>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[425px] mx-auto my-4 p-0 flex flex-col">
        <div className="flex-grow overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>Add members</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <p className="text-base">
              🥦ഗ്രീൻ ക്ലീൻ കേരള  ഹരിത  മത്സരങ്ങളിൽ  പങ്കെടുക്കാൻ ..........
              <br />
              🥦താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു  രജിസ്റ്റർ ചെയ്തതിനുശേഷം യൂസർ നെയ്മും പാസ്സ്‌വേർഡും  ക്രിയേറ്റ് ചെയ്തു  സബ്മിറ്റ് ചെയ്യുക.
              👇🏼
            </p>
            <Link
              href={`/user-register?id=${id}&ref=${referral_code}`}
              className="text-green-600 text-base"
            >
              {baseURL}/user-register?id={parseInt(id!)}&ref={referral_code}
            </Link>
            <p className="py-2">
              🥦 സംശയങ്ങൾക്ക് 
              <br/>
              🥦 9645 9645 92 
              <br/>
              🥦 Web: www.GreenCleanEarth.org 
              <br/>
              🥦 Youtube /fb/insta: Green Clean Kerala
              <br/>
              🥦 Whatsapp/Telegram : 9645 9645 92
              <br/>
              🥦 Mail: GreenCleanKerala@gmail.Com 
              <br/>
              🥦 Follow the link to join GreenCleanEarth mission.
            </p>
          </div>
        </div>
        <div className="p-2 border-t">
          <Button
            onClick={() => copyToClipboard(message)}
            className="bg-green-600 hover:bg-green-800 rounded-full w-16 h-12 flex items-center justify-center ml-auto"
          >
            {isCopied ? (
              <span className="text-xs">Copied!</span>
            ) : (
              <span className="text-xs"><Copy className="h-5 w-10" />Copy</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}