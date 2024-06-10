// pages/logout.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useToast } from "@/components/ui/use-toast"
import { apiURL } from '@/app/requestsapi/request';


const Logout = () => {
    const { toast } = useToast()
    const router = useRouter();

  useEffect(() => {
    // Clear the authentication cookies
    async function logout() {
      const response = await fetch(`${apiURL}/logout`,
      {
        method: 'GET',
      }
    );
    console.log(response);
    Cookies.remove('token');
    toast({
        title: "Logout",
        description: "You have been logged out successfully!",
      });
    // Redirect to the login page
    router.push('/login');
    }
    logout();
  }, [router,toast]);


};

export default Logout;
