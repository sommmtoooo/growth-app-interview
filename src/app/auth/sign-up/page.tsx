"use client";

import Button from "@/components/Button";
import InfoField from "@/components/InfoField";
import TextBox from "@/components/TextBox";
import Link from "next/link";
import { registerUser } from "@/app/actions";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";
import { useFormState } from "react-dom";
import { useEffect } from "react";


export default function SignUpPage() {
  const router = useRouter()
  const [state, formAction] = useFormState(registerUser, {
    username: '',
    password: ''
  })

  useEffect(() => {
    if (state?.success) {
      if (state.message)
        toast(state.message)
      setTimeout(() => router.push('/auth/sign-in'), 1500)
    } else {
      if (state.message)
        toast(state.message)
    }
  }, [state])

  return (
    <main className="min-h-[100vh] flex flex-col justify-center">
      <div className="w-5/6 max-w-[500px] mx-auto">
        <div className="text-center my-3">
          <h1 className="font-bold text-2xl text-green-600">Sign Up</h1>
          <p className="text-neutral-500">
            Create an account to light that bulb
          </p>
        </div>

        <form action={formAction}>
          <div className="my-3">
            <TextBox
              name="username"
              type="text"
              placeholder="username.john.doe"
            />
            {state?.errors?.username ?
              <span className="text-red-500">{state.errors.username[0]}</span> : ''}
          </div>
          <div className="my-3">
            <TextBox
              name="password"
              type="password"
              placeholder="*********"
            />
            {state?.errors?.password ?
              <span className="text-red-500">{state.errors.password[0]}</span> : ''}
          </div>
          <div className="my-3">
            <Button
              className="w-full bg-green-600 text-white px-3 py-2 rounded-md"
              type="submit"
              name="Sign Up"
            />
          </div>
        </form>
        <hr />
        <div className="my-3">
          <p className="text-neutral-600 text-right">
            Have an account ?{" "}
            <Link href={"/auth/sign-in"} className="text-green-600 font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}
