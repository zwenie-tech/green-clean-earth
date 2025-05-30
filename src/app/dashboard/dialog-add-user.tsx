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
import Cookies from "js-cookie";

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
  const referral_code = Cookies.get("cord_refcode");
  const id = searchParams.get("id");
  const message = `
  *യൂസർ രജിസ്ട്രേഷൻ*
🥦
*ഗ്രീൻ ക്ലീൻ കേരള സുസ്ഥിരവികസന ഹരിത മത്സരങ്ങളിൽ പങ്കെടുക്കുവാൻ....*
🥦
 താഴെക്കൊടുത്ത വീഡിയോ കാണുക
👇🏼
ലിങ്ക് video
👆🏼
 അതിനുശേഷം
 താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു  വീഡിയോയിൽ പറഞ്ഞത് പ്രകാരം  
 പ്രവർത്തിക്കുക
👇🏼
${baseURL}user-register?id=${parseInt(id!)}&ref=${referral_code}
👆🏼

 സംശയങ്ങൾക്ക്
🥦
Web: www.GreenCleanEarth.org 

Whatsapp/Telegram : 9645 9645 92

Mail: GreenCleanKerala@gmail.com.

Youtube /fb/insta: Green Clean Kerala

🥦
 വാർത്തകളും റിസൽ ട്ടുകളും അറിയുവാൻ ചാനലും പേജും  സബ്സ്ക്രൈബ്- ഫോളോ  ചെയ്യുക
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
        <label className="flex items-center justify-center bg-light-green rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-light-gray hover:z-10">
          <div>
            <FaUpload />
          </div>
          <div className="p-4 text-xl">Invite Users</div>
        </label>
      </DialogTrigger>
      <DialogContent
  className="max-w-[calc(100%-2rem)] sm:max-w-[425px] mx-auto p-0 flex flex-col max-h-[80vh] overflow-y-auto rounded-xl"
>
        <div className="flex-grow overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>Add members</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <p className="text-base">
            <b>യൂസർ രജിസ്ട്രേഷൻ</b>
            <br></br>
            🥦
            <b>ഗ്രീൻ ക്ലീൻ കേരള സുസ്ഥിരവികസന ഹരിത മത്സരങ്ങളിൽ പങ്കെടുക്കുവാൻ....</b>
            🥦
            <br></br>
            താഴെക്കൊടുത്ത വീഡിയോ കാണുക
            👇🏼<br></br>
            ലിങ്ക് video
            <br></br>👆🏼<br></br>
            അതിനുശേഷം
            താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു  വീഡിയോയിൽ പറഞ്ഞത് പ്രകാരം  
            പ്രവർത്തിക്കുക
            👇🏼
            </p>
            <Link
              href={`/user-register?id=${id}&ref=${referral_code}`}
              className="text-green-600 text-base"
            >
              {baseURL}user-register?id={parseInt(id!)}&ref={referral_code}
            </Link>
            <p className="py-2">
            👆🏼<br></br>

            സംശയങ്ങൾക്ക്
            🥦<br></br>
            Web: www.GreenCleanEarth.org <br></br>

            Whatsapp/Telegram : 9645 9645 92<br></br>

            Mail: GreenCleanKerala@gmail.com.<br></br>

            Youtube /fb/insta: Green Clean Kerala<br></br>

            🥦
            വാർത്തകളും റിസൽ ട്ടുകളും അറിയുവാൻ ചാനലും പേജും  സബ്സ്ക്രൈബ്- ഫോളോ  ചെയ്യുക
            </p>
          </div>
        </div>
        <div className="p-2 border-t">
        <Button
  onClick={() => copyToClipboard(message)}
  className="bg-green-600 hover:bg-green-800 rounded-full w-20 h-12 flex items-center justify-center ml-auto gap-1"
>
  {isCopied ? (
    <span className="text-xs">Copied!</span>
  ) : (
    <>
      <Copy className="h-4 w-4" />
      <span className="text-xs">Copy</span>
    </>
  )}
</Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}
