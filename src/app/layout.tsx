
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

// const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_Malayalam({subsets: ["latin","malayalam"]})

export const metadata: Metadata = {
  title: "ഗ്രീൻ ക്ലീൻ കേരള സുസ്ഥിര വികസന ഹരിത മത്സരങ്ങൾ",
  description: "സുസ്ഥിര വികസിതവും മാലിന്യമുക്തവും ഹരിതാഭവും ആയ കേരളം എന്ന ലക്‌ഷ്യം സാക്ഷാൽക്കരിക്കാനായി Green Clean Kerala Mission , വിദ്യാർത്ഥികൾക്കും പരിസ്ഥിതി തല്പരർക്കുമായി സംഘടിപ്പിക്കുന്ന മത്സരാധിഷ്ഠിതമായ ഒരു പദ്ധതിയാണ് ഗ്രീൻ ക്ലീൻ കേരള -ഹരിത മത്സരങ്ങൾ."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/jpeg" href='/images/slide01.jpg' />
      </head>
      <body className={noto.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
