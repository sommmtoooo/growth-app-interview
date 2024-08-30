"use client";

import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    SetLoading(true);

    try {
      const resp = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await resp.json();

      if (data.success) {
        toast("Account Created :)");
        router.push('/auth/sign-in')
      } else {
        if (data.message) toast(data.message);
      }

    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };

  return (
    <main className="min-h-[100vh] flex flex-col justify-center">
      <div className="w-5/6 max-w-[500px] mx-auto">
        <div className="text-center my-3">
          <h1 className="font-bold text-2xl text-green-600">Sign Up</h1>
          <p className="text-neutral-500">
            Create an account to light that bulb
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
              name={loading ? "..." : "Sign Up"}
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
