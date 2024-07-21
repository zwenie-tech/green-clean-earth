// pages/logout.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useToast } from "@/components/ui/use-toast";
import { apiURL } from '@/app/requestsapi/request';

const Logout = () => {
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        // Clear all cookies
        async function logout() {
            const response = await fetch(`${apiURL}/logout`, {
                method: 'GET',
            });
            
            // Get all cookies
            const allCookies = Cookies.get();

            // Remove all cookies
            Object.keys(allCookies).forEach(cookieName => {
                Cookies.remove(cookieName);
            });

            toast({
                title: "Logout",
                description: "You have been logged out successfully!",
            });

            // Redirect to the login page
            router.push('/loginform');
        }

        logout();
    }, [router, toast]);

    return null; // You can return null or a loader if you prefer
};

export default Logout;
