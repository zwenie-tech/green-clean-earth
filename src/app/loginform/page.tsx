"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { apiURL } from "@/app/requestsapi/request";
import { useToast } from "@/components/ui/use-toast";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

// User login schema
const userSchema = z.object({
  mobile: z.coerce.number().lte(9999999999),
  password: z.string().min(1).max(255),
});

// Coordinator login schema
const coordinatorSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(1).max(255),
});

const LoginForm = () => {
  const [isUserLogin, setIsUserLogin] = useState(true);
  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const coordinatorForm = useForm<z.infer<typeof coordinatorSchema>>({
    resolver: zodResolver(coordinatorSchema),
  });

  // Determine the background color based on the state
  const parentBgColor = isUserLogin ? '#E4EBF7' : '#FEFAEC'; 

  const { toast } = useToast();
  const router = useRouter();

  async function onUserSubmit(values: z.infer<typeof userSchema>) {
    const apidata = {
      phoneNumber: values.mobile,
      password: values.password,
    };

    try {
      const response = await fetch(`${apiURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apidata),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      

      const id = result.data.id;
      const token = result.data.token;
      const refcode = result.data.refferalCode;
      const uname = result.data.userName;

      
      if (id) {
        toast({
          title: "Account logged in.",
          description: "Successfully logged in.",
        });
        Cookies.set("token", token, { expires: 1 });
        Cookies.set("login_type", "user", { expires: 1 });
        Cookies.set("user_refcode", refcode, { expires: 1 });
        Cookies.set("name", uname, { expires: 1 });

        Cookies.set("userId", id, { expires: 1 });
        
        router.replace("/user-dash-home?id=" + id);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials.",
      });
    }
  }

  async function onCoordinatorSubmit(values: z.infer<typeof coordinatorSchema>) {
    try {
      const response = await fetch(
        `${apiURL}/coordinator/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
    

      const refcode = result.data.referral_code;

      const id = result.data.id;
      const gname = result.data.gp_name;
      const gid = result.data.groupId;

      const token = result.data.token;
      
      if (id) {
        toast({
          title: "Account logged in.",
          description: "Successfully logged in.",
        });
        Cookies.set('token', token, { expires: 1 });
        Cookies.set("cord_refcode", refcode, { expires: 1 });
        Cookies.set("login_type", "coordinator", { expires: 1 });
        Cookies.set("coid", id, { expires: 1 });
        Cookies.set("gname", gname, { expires: 1 });
        Cookies.set("cogid", gid, { expires: 1 });
        


        router.push(`/dashboard?id=${id}&gid=${gid}`);
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  }

  return (
    <>
      <NavigationBar />
      <div className="mt-3 container mx-auto p-4 flex flex-col lg:flex-row items-stretch opacity-80"
        style={{
          backgroundImage: 'url(/images/login.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right',
          borderRadius: '20px',
        }}>
        <div className="w-full lg:w-2/3 flex hidden lg:block">
        </div>
  <div className="w-full lg:w-1/3 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center" style={{ backgroundColor: parentBgColor }} >
          <Container>
            <Row className="justify-content-end">
              <Col md={4} className="p-2 rounded shadow opacity-80" style={{ borderRadius: '20px' }}>
              <div className="flex flex-row bg-transparent rounded mb-5 justify-center items-center w-3/4 mx-auto gap-2">
          <button
            onClick={() => setIsUserLogin(true)}
            className={`w-2/5 text-center rounded-2xl font-bold bg-[#E4EBF7] py-3 text-http://localhost:3000[#3C6E1F] hover:bg-primary/15 border-2 ${
              isUserLogin
                ? 'shadow-lg border-[#3C6E1F]' // Apply shadow and border color when active
                : 'border-transparent bg-transparent' // No shadow and border when inactive
            }`}
          >
            User
          </button>
          <button
            onClick={() => setIsUserLogin(false)}
            className={`w-3/5 text-center rounded-2xl font-bold bg-transparent py-3 text-[#3C6E1F] hover:bg-primary/15 border-2 ${
              !isUserLogin
                ? 'shadow-lg border-[#3C6E1F]' // Apply shadow and border color when active
                : 'border-transparent bg-transparent' // No shadow and border when inactive
            }`}
          >
            Coordinator
          </button>
        </div>
                {isUserLogin && (
                  <Form {...userForm}>
                    <form noValidate onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-8">
                      <FormField
                        control={userForm.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-center mx-5" style={{ marginLeft: '10%', marginRight: '10%' }}>
                              <FormControl className="shadow-xl rounded-md border-0">
                                <Input
                                  type="tel"
                                  placeholder="Mobile"
                                  className="bg-white text-black"
                                  style={{ backgroundColor: '#FFFFFF', opacity: 1 }}
                                  {...field}
                                  pattern="[0-9]*"
                                />
                              </FormControl>
                            </div>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={userForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-center mx-5" style={{ marginLeft: '10%', marginRight: '10%' }}>
                              <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                                <Input type="password" placeholder="Password" className="bg-white text-black" {...field} />
                              </FormControl>
                            </div>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-center w-full">
                        <Button type="submit" style={{ width: '50%' }} className="bg-primary items-center">Submit</Button>
                      </div>
                      <div className="flex justify-center w-full mt-4">
                        <a href="/forgot-password-user" className="text-primary">Forgot your password?</a>
                      </div>
                      {/* <div className="flex justify-center w-full mt-4">
                        <Button type="button" className="shadow-xl bg-white text-green-600">Register</Button>
                      </div> */}
                    </form>
                  </Form>
                )}
                {!isUserLogin && (
                  <Form {...coordinatorForm}>
                    <form noValidate onSubmit={coordinatorForm.handleSubmit(onCoordinatorSubmit)} className="space-y-8" >
                      <FormField
                        control={coordinatorForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-center mx-5" style={{ marginLeft: '10%', marginRight: '10%' }}>
                              <FormControl className="shadow-xl rounded-md border-0">
                                <Input
                                  type="text"
                                  placeholder="Username"
                                  className="bg-white text-black"
                                  style={{ backgroundColor: '#FFFFFF', opacity: 1 }}
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={coordinatorForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-center mx-5" style={{ marginLeft: '10%', marginRight: '10%' }}>
                              <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                                <Input type="password" placeholder="Password" className="bg-white text-black" {...field} />
                              </FormControl>
                            </div>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-center w-full">
                        <Button type="submit" style={{ width: '50%' }} className="bg-primary items-center">Submit</Button>
                      </div>
                      <div className="flex justify-center w-full mt-4">
                        <a href="/forgot-password-coordinator" className="text-primary">Forgot your password?</a>
                      </div>
                      <div className="flex justify-center w-full mt-4">
                        <a href="/register"><Button type="button" className="shadow-xl bg-white text-primary">Register</Button></a>
                      </div>
                    </form>
                  </Form>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
