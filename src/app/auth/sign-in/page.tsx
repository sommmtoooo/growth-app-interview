"use client";

import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { measureMemory } from "vm";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    SetLoading(true);
    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/"
    })
  };

  return (
    <main className="min-h-[100vh] flex flex-col justify-center">
      <div className="w-5/6 max-w-[500px] mx-auto">
        <div className="text-center my-3">
          <h1 className="font-bold text-2xl text-green-600">Sign In</h1>
          <p className="text-neutral-500">
            Login into your account to switch that bulb
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <TextBox
              name="username"
              type="text"
              placeholder="username.john.doe"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />
          </div>
          <div className="my-3">
            <TextBox
              name="password"
              type="password"
              placeholder="*********"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
          </div>
          <div className="my-3">
            <Button
              className="w-full bg-green-600 text-white px-3 py-2 rounded-md"
              type="submit"
              name={loading ? "..." : "Sign In"}
            />
          </div>
        </form>
        <hr />
        <div className="my-3">
          <p className="text-neutral-600 text-right">
            Have an account ?{" "}
            <Link href={"/auth/sign-up"} className="text-green-600 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}
