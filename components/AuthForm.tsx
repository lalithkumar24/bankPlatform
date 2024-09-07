"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { AuthformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = AuthformSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Sign up with Appwrite && create plaid token
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-5">
        <Link href="/" className="cursor-pointer flex items-center  gap-1 ">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="FinVault logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            FinVault
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "sign-In" : "sign-Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started "
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/*plaidLink*/}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="First Name"
                      placeholder="First Name"
                      name="firstName"
                    />
                    <CustomInput
                      control={form.control}
                      label="Last Name"
                      placeholder="Last Name"
                      name="lastName"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label="Address"
                    placeholder="Enter specific Address"
                    name="address1"
                  />
                  <CustomInput
                    control={form.control}
                    label="City"
                    placeholder="Ex:Chennai"
                    name="city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="State"
                      placeholder="Example : TN"
                      name="state"
                    />
                    <CustomInput
                      control={form.control}
                      label="Postal Code"
                      placeholder="Ex:601 206"
                      name="postalCode"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                      name="dateofBirth"
                    />
                    <CustomInput
                      control={form.control}
                      label="SSN"
                      placeholder="Ex:ABCTY1234D"
                      name="ssn"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                label="Email"
                placeholder="Email address"
                name="email"
              />
              <CustomInput
                control={form.control}
                label="Password"
                placeholder="Enater Password"
                name="password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign-In"
                  ) : (
                    "Sign-Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-700">
              {type === "sign-in"
                ? "Don't havne an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "sign-up" : "sign-in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
