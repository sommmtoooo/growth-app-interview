"use client";
import Button from "@/components/Button";
import LightBulb from "@/components/LightBulb";
import TextBox from "@/components/TextBox";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [response, setResponse] = useState('')

  const handleSignOut = async function () {
    setLoading(true);
    await signOut({
      redirect: true,
      callbackUrl: "/auth/sign-in",
    });
    setLoading(false);
    toast("Signed Out");
  };

  useEffect(() => {
    fetch('/api/lightbulb').then(res => res.json()).then((data) => {
      if(data.success){
        setActive(data.data.status)
      }
    })
  }, [])

  const handlePromptClick = async function () {
    setFetching(!fetching)
    setResponse('Processing request')
    setTimeout(() => { setActive(!active); setResponse(active ? 'Switched Off' : 'Switched On'); setFetching(false) }, 1000)
  }

  return (
    <main>
      <div className="w-5/6 min-h-screen mx-auto flex flex-col justify-center align-center text-center">
        <h1 className="font-bold  text-xl text-green-600">LIT</h1>
        <p className="text-neutral-600">Try command the bulb with words</p>
        <div className="w-max mx-auto my-6">
          <LightBulb active={active} />
        </div>
        <div className="w-full min-w-[420px] max-w-[420px] h-max mx-auto rounded-full overflow-hidden text-left text-neutral-500">
          <p className="my-3 transition-all">{response}</p>
        </div>
        <div className="relative w-full min-w-[420px] max-w-[420px] h-max mx-auto rounded-full overflow-hidden border-2 border-neutral-300 focus:border-yellow-500">
          <TextBox type="text" placeholder="Enter Command" />
          <Button
            type="button"
            className="w-max absolute right-0 top-0 px-3 py-2 h-100 bg-green-500 rounded-full text-white"
            name={fetching ? "..." : "Prompt"}
            onClick={handlePromptClick}
          />
        </div>
        <div className="w-full min-w-[420px] max-w-[420px] h-max mx-auto my-4 rounded-full overflow-hidden">
          <Button
            type="button"
            className="px-3 py-2 h-100 bg-red-500 rounded-full text-white"
            name={loading ? "..." : "Sign Out"}
            onClick={handleSignOut}
          />
        </div>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}
