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
import { useState } from "react";
import { baseURL } from "@/app/requestsapi/request";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

export function DialogAddUser() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const referral_code = "user" + id!.toString();
  const message = `
  *അപ്‌ലോഡർ രജിസ്ട്രേഷൻ*
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
${baseURL}/user-register?id=${parseInt(id!)}&ref=${referral_code}
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
        <Button className="bg-green-600 hover:bg-green-800 my-2">
          <LinkIcon className="mr-2 h-4 w-4" />
          Get referral link
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[425px] h-[calc(100vh-4rem)] mx-auto my-4 p-0 flex flex-col">
        <div className="flex-grow overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>Add members</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <p className="text-base">
            <b>അപ്‌ലോഡർ രജിസ്ട്രേഷൻ</b>
            🥦
            <b>ഗ്രീൻ ക്ലീൻ കേരള സുസ്ഥിരവികസന ഹരിത മത്സരങ്ങളിൽ പങ്കെടുക്കുവാൻ....*</b>
            🥦
            താഴെക്കൊടുത്ത വീഡിയോ കാണുക
            👇🏼
            ലിങ്ക് video
            👆🏼
            അതിനുശേഷം
            താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു  വീഡിയോയിൽ പറഞ്ഞത് പ്രകാരം  
            പ്രവർത്തിക്കുക
            👇🏼
            </p>
            <Link
              href={`/user-register?id=${id}&ref=${referral_code}`}
              className="text-green-600 text-base"
            >
              {baseURL}/user-register?id={parseInt(id!)}&ref={referral_code}
            </Link>
            <p className="py-2">
            👆🏼

            സംശയങ്ങൾക്ക്
            🥦
            Web: www.GreenCleanEarth.org 

            Whatsapp/Telegram : 9645 9645 92

            Mail: GreenCleanKerala@gmail.com.

            Youtube /fb/insta: Green Clean Kerala

            🥦
            വാർത്തകളും റിസൽ ട്ടുകളും അറിയുവാൻ ചാനലും പേജും  സബ്സ്ക്രൈബ്- ഫോളോ  ചെയ്യുക
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