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
  FormLabel,
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
      if (id) {
        toast({
          title: "Account logged in.",
          description: "Successfully logged in.",
        });
        Cookies.set("token", token, { expires: 1 });
        router.replace("/my-page?id=" + id);
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
      const response = await fetch(`${apiURL}/coordinator/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const id = result.data.id;
      const token = result.data.token;
      Cookies.set("token", token, { expires: 1 });
      if (id) {
        toast({
          title: "Account logged in.",
          description: "Successfully logged in.",
        });
        router.push(`/coordinator-dashboard?id=${id}`);
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
      <div
        className="d-flex align-items-center justify-content-end vh-100"
        style={{
          backgroundImage: 'url(/images/login.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right',
          borderRadius: '20px',
        }}
      >
        
        <Container>
          <Row className="justify-content-end">
            <Col
              md={4}
              className="bg-white p-4 rounded shadow opacity-80 ml-3 ml-sm-5"
              style={{
                height: '500px',
                borderRadius: '20px',
                marginLeft: '30%', // Default margin for larger screens
              }}
            >
   <div className="m-9 d-flex justify-content-between align-items-center text-2xl" style={{ marginLeft: '15%', marginRight: '10%' }}>
  <Button
    variant={isUserLogin ? "link" : "light"}
    className={`text-${isUserLogin ? '[#3C6E1F]' : 'black'} text-2xl`} // Increase text size
    onClick={() => setIsUserLogin(true)}
    style={{ marginLeft: '20%',gap:'10%' }}
  >
    User
  </Button>
  
  <Button
    variant={!isUserLogin ? "link" : "light"}
    className={`text-${!isUserLogin ? '[#3C6E1F]' : 'black'} text-2xl ml-auto`} // Increase text size and add margin-left
    onClick={() => setIsUserLogin(false)}
    style={{ marginLeft: '20%' }}
  >
    Coordinator
  </Button>
</div>
              {/* User Login Form */}
              {isUserLogin ? (
                <Form {...userForm}>
                  <form noValidate onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-8">
                    <FormField
                      control={userForm.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                         {/* <FormLabel>Mobile</FormLabel>*/}
                         <div className="flex justify-center mx-5" style={{ marginLeft:'10%',marginRight:'10%' }}>
                          <FormControl className="shadow-xl rounded-md border-0">
                          <Input
                             type="number"
                             placeholder="Mobile"
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
                      control={userForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          {/*<FormLabel>Password</FormLabel>*/}
                          <div className="flex justify-center mx-5" style={{ marginLeft:'10%',marginRight:'10%' }}>
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
                      <Button type="submit" style={{ width: '50%' }} className="bg-green-600 items-center">Submit</Button>
                    </div>
                    <div className="flex justify-center w-full mt-4">
                      <a href="#" className="text-green-600">Forgot your password?</a>
                    </div>
                    <div className="flex justify-center w-full mt-4">
                      <Button type="button" className=" shadow-xl bg-white text-green-600">Register</Button>
                    </div>

                  </form>
                </Form>
              ) : (
                // Coordinator Login Form
                <Form {...coordinatorForm}>
                  <form noValidate onSubmit={coordinatorForm.handleSubmit(onCoordinatorSubmit)} className="space-y-8">
                    <FormField
                      control={coordinatorForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          {/*<FormLabel>Username</FormLabel>*/}
                          <div className="flex justify-center mx-5" style={{ marginLeft:'10%',marginRight:'10%' }}>
                          <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                            <Input placeholder="Username" className="bg-white text-black" {...field} />
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
                          {/*<FormLabel>Password</FormLabel>*/}
                          <div className="flex justify-center mx-5" style={{ marginLeft:'10%',marginRight:'10%' }}>
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
                       <Button type="submit" style={{ width: '50%' }} className="bg-green-600 items-center">Submit</Button>
                    </div>
                    <div className="flex justify-center w-full mt-4">
                      <a href="#" className="text-green-600">Forgot your password?</a>
                    </div>
                    <div className="flex justify-center w-full mt-4">
                      <Button type="button" className="shadow-xl bg-white text-green-600">Register</Button>
                    </div>

                  </form>
                </Form>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
