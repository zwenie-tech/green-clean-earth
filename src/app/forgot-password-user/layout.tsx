import Navigationbar from "@/components/navigationBar";
import Footer from "@/components/footer";
import Earth from "@/components/earth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
    <Navigationbar />
    {children}
    <Earth />
    <Footer />
  </>
  );
}
