"use client";

import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(false);
  const router = useRouter()


  const ToastInfo = {
    background: 'green',
    color: 'white'
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (username.length < 3 || password.length < 3) {
      toast('Usercame must be 3 or more characters long', {
        position: 'bottom-left', style: ToastInfo
      })
      return
    }

    if (username.length < 3 || password.length < 3) {
      toast('Password should be 6 characters or more', {
        position: 'bottom-left', style: ToastInfo
      })
      return
    }

    SetLoading(true);

    await signIn("credentials", {
      username,
      password,
      redirect: false
    }).then(({ ok, error }) => {
      SetLoading(false);
      if (ok) {
        toast("Signed In")
        router.push('/')
      } else {
        if (error) {
          if (error === "CredentialsSignin") {
            toast('Invalid Credentials')
          } else {
            toast('Something went wrong')
          }
        } else {
          toast('Invalid Credentials')
        }
      }
    }).catch((e) => {
      SetLoading(false)
      toast('Something went wrong')
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
              minLength={3}
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
              minLength={3}
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
            Don&apos;t Have an account ?{" "}
            <Link href={"/auth/sign-up"} className="text-green-600 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-right" toastOptions={{
        duration: 1750
      }} />
    </main>
  );
}