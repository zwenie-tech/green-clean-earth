// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { LinkIcon, Copy } from "lucide-react";
// import Link from "next/link";
// import { Suspense, useState } from "react";
// import { baseURL } from "@/app/requestsapi/request";
// import { useToast } from "@/components/ui/use-toast";
// import { useSearchParams } from "next/navigation";
// import { FaUpload } from "react-icons/fa";
// import Cookies from 'js-cookie';

// export function DialogAddUser() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <DialogAddUserfn />
//     </Suspense>
//   );
// }
// function DialogAddUserfn() {
//   const { toast } = useToast();
//   const searchParams = useSearchParams();
//   const referral_code = Cookies.get('cord_refcode');
//   const id = searchParams.get("id");
//   const message1 = `
 
// 🥦
// പ്രിയപ്പെട്ടവരേ 

//  കേരളത്തിൽ നിന്നും ഒരുകോടി വൃക്ഷത്തൈകൾ  നട്ട് വളർത്തി പരിപാലിച്ചു  അതിന്റെ ഓരോ മൂന്നുമാസത്തെയും വളർച്ച പ്രകടമാകുന്ന ഫോട്ടോ  www.GreenCleanEarth.org എന്ന വെബ്സൈറ്റിൽ പ്രസിദ്ധീകരിച്ചു  ഐക്യരാഷ്ട്രസഭയുടെ പരിസ്ഥിതി വിഭാഗമായ യു.എൻ.ഇ.പി.യിലേക്ക്  സമർപ്പിക്കുവാൻ ലക്ഷ്യമിടുന്ന  ഗ്രീൻ ക്ലീൻ കേരള വൃക്ഷത്തൈ പരിപാലന മത്സരത്തിലും  അതോടൊപ്പം ഉള്ള  ഹരിത -കലാ- ശാസ്ത്ര മത്സരങ്ങളിലും  നമ്മുടെ സ്ഥാപനവും പങ്കെടുക്കുന്നുണ്ട്. 
// 🥦
//  നമ്മുടെ വിദ്യാലയവും വീടും പരിസരവും മാലിന്യമുക്തവും ഹരിതാഭവും ആക്കുവാനുള്ള പ്രവർത്തനങ്ങൾ നടത്തുന്ന
// ഈ മത്സരങ്ങളിൽ മികച്ച പ്രകടനം ചെയ്യുന്ന  വ്യക്തികൾക്കും സ്ഥാപനങ്ങൾക്കുമായി  പ്രൊഫസർ ശോഭീന്ദ്ര ന്റെ പേരിലുള്ള ഒരു ലക്ഷം രൂപയുടെ പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും ഉണ്ട്.
// 🥦
//  ഈ മത്സരങ്ങളിൽ പങ്കെടുക്കുവാനായി  എല്ലാ അധ്യാപകരും  ഈ ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു  രജിസ്ട്രേഷൻ നടത്തി ഒരു യൂസർ നെയിം പാസ്സ്‌വേർഡും ക്രിയേറ്റ് ചെയ്തു  വിദ്യാർത്ഥികൾക്ക് അയച്ചുകൊടുക്കുകയും , 
//  അവർ ഈ വർഷം നട്ട് വളർത്തിയ തൈകളുടെ കൂടെ  ഒരു സെൽഫി എടുത്ത്, ഓരോ മൂന്നുമാസം കൂടുമ്പോഴും   ഈ വെബ്സൈറ്റിൽ അപ്‌ലോഡ് ചെയ്യണമെന്ന്  നിർദ്ദേശിക്കണമെന്നും അഭ്യർത്ഥിക്കുന്നു
// 🥦
//  താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു  രജിസ്റ്റർ ചെയ്തതിനുശേഷം യൂസർ നെയ്മും പാസ്സ്‌വേർഡും  ക്രിയേറ്റ് ചെയ്തു  വിദ്യാർത്ഥികൾക്ക് അയച്ചു കൊടുക്കുക 
// 👇🏼
// ${baseURL}/user-register1?id=${parseInt(id!)}&ref=${referral_code}
// 🥦
//  സംശയങ്ങൾക്ക്
// 🥦
// 9645 9645 92
// 🥦
// Web: www.GreenCleanEarth.org 
// Youtube /fb/insta: Green Clean Kerala
// Whatsapp/Telegram : 9645 9645 92
// Mail: GreenCleanKerala@gmail.Com
// Follow the link to join GreenCleanEarth mission.
// `;

//   const [isCopied, setIsCopied] = useState(false);
//   const copyToClipboard = async (text: any) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setIsCopied(true);
//       setTimeout(() => {
//         setIsCopied(false);
//       }, 1000);
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Oops, Something went wrong!",
//         description: "Please try again...",
//       });
//       console.error(err);
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
        
//       <label className="btn btn-primary flex align-items-center  bg-light-green rounded-lg"style={{width:'300px',height: '70px',boxShadow:'1px 4px 5px 3px #00000040'}} >
//     <div
//      style={{ width: '60px',height: '70px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center',}}
//     >
//     <FaUpload />

//    </div>
//     <div className="pt-5 p-1 text-lg md:text-2xl md:pt-5 md:pr-3">Invite Users</div>
    
//   </label>
//       </DialogTrigger>
//       <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[425px] h-[calc(100vh-4rem)] mx-auto my-4 p-0 flex flex-col">
//         <div className="flex-grow overflow-y-auto p-6">
//           <DialogHeader>
//             <DialogTitle>Add members</DialogTitle>
//             <DialogDescription></DialogDescription>
//           </DialogHeader>
//           <div>
//             <p className="text-base">
//               🥦 പ്രിയപ്പെട്ടവരേ
//               <br />
//               <br />
//               കേരളത്തിൽ നിന്നും ഒരുകോടി വൃക്ഷത്തൈകൾ  നട്ട് വളർത്തി
//               പരിപാലിച്ചു  അതിന്റെ ഓരോ മൂന്നുമാസത്തെയും വളർച്ച
//               പ്രകടമാകുന്ന ഫോട്ടോ  www.GreenCleanEarth.org എന്ന വെബ്സൈറ്റിൽ
//               പ്രസിദ്ധീകരിച്ചു  ഐക്യരാഷ്ട്രസഭയുടെ പരിസ്ഥിതി
//               വിഭാഗമായ യു.എൻ.ഇ.പി.യിലേക്ക്  സമർപ്പിക്കുവാൻ ലക്ഷ്യമിടുന്ന
//               ഗ്രീൻ ക്ലീൻ കേരള വൃക്ഷത്തൈ പരിപാലന മത്സരത്തിലും  അതോടൊപ്പം ഉള്ള
//               ഹരിത -കലാ- ശാസ്ത്ര മത്സരങ്ങളിലും  നമ്മുടെ സ്ഥാപനവും
//               പങ്കെടുക്കുന്നുണ്ട്. 
//               🥦 നമ്മുടെ വിദ്യാലയവും വീടും
//               പരിസരവും മാലിന്യമുക്തവും ഹരിതാഭവും ആക്കുവാനുള്ള
//               പ്രവർത്തനങ്ങൾ നടത്തുന്ന ഈ മത്സരങ്ങളിൽ മികച്ച പ്രകടനം
//               ചെയ്യുന്ന  വ്യക്തികൾക്കും സ്ഥാപനങ്ങൾക്കുമായി  പ്രൊഫസർ
//               ശോഭീന്ദ്ര ന്റെ പേരിലുള്ള ഒരു ലക്ഷം രൂപയുടെ പുരസ്കാരങ്ങളും
//               സമ്മാനങ്ങളും ഉണ്ട്. 
//               🥦 ഈ മത്സരങ്ങളിൽ
//               പങ്കെടുക്കുവാനായി  എല്ലാ അധ്യാപകരും  ഈ ലിങ്കിൽ ക്ലിക്ക്
//               ചെയ്തു  രജിസ്ട്രേഷൻ നടത്തി ഒരു യൂസർ നെയിം പാസ്സ്‌വേർഡും
//               ക്രിയേറ്റ് ചെയ്തു  വിദ്യാർത്ഥികൾക്ക് അയച്ചുകൊടുക്കുകയും ,
//               അവർ ഈ വർഷം നട്ട് വളർത്തിയ തൈകളുടെ കൂടെ  ഒരു സെൽഫി
//               എടുത്ത്, ഓരോ മൂന്നുമാസം കൂടുമ്പോഴും   ഈ വെബ്സൈറ്റിൽ
//               അപ്‌ലോഡ് ചെയ്യണമെന്ന്  നിർദ്ദേശിക്കണമെന്നും അഭ്യർത്ഥിക്കുന്നു
//               🥦 താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു  രജിസ്റ്റർ
//               ചെയ്തതിനുശേഷം യൂസർ നെയ്മും പാസ്സ്‌വേർഡും  ക്രിയേറ്റ്
//               ചെയ്തു  വിദ്യാർത്ഥികൾക്ക് അയച്ചു കൊടുക്കുക 
//               👇🏼
//             </p>
//             <Link
//               href={`/user-register?id=${id}&ref=${referral_code}`}
//               className="text-green-600 text-base"
//             >
//               {baseURL}/user-register1?id={parseInt(id!)}&ref={referral_code}
//             </Link>
//             <p className="py-2">
//               🥦 സംശയങ്ങൾക്ക് 🥦 9645 9645 92 🥦 Web:
//               www.GreenCleanEarth.org Youtube /fb/insta: Green Clean Kerala
//               Whatsapp/Telegram : 9645 9645 92 Mail:
//               GreenCleanKerala@gmail.Com Follow the link to join
//               GreenCleanEarth mission.
//             </p>
//           </div>
//         </div>
//         <div className="p-2 border-t">
//           <Button
//             onClick={() => copyToClipboard(message1)}
//             className="bg-green-600 hover:bg-green-800 rounded-full w-16 h-12 flex items-center justify-center ml-auto"
//           >
//             {isCopied ? (
//               <span className="text-xs">Copied!</span>
//             ) : (
//               <span className="text-xs"><Copy className="h-5 w-10" />Copy</span>
//             )}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }