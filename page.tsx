"use client";
import React, { useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { LoginButton } from "@/app/components/LoginButton";
import { TokenTransfer } from "@/app/components/TokenTransfer";
import GetButton from "@/app/components/GetButton";
import { getAccount, useOkto } from "@okto_web3/react-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { Profile } from "./components/profile";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const { data: session } = useSession();
  const oktoClient = useOkto();
  const queryClient = new QueryClient();

  //@ts-ignore
  const idToken = useMemo(() => (session ? session.id_token : null), [session]);

  async function handleAuthenticate(): Promise<any> {
    if (!idToken) {
      return { result: false, error: "No google login" };
    }
    const user = await oktoClient.loginUsingOAuth({
      idToken: idToken,
      provider: "google",
    });
    console.log("Authentication Success", user);
    return JSON.stringify(user);
  }

  async function handleLogout() {
    try {
      signOut();
      return { result: "logout success" };
    } catch (error) {
      return { result: "logout failed" };
    }
  }

  useEffect(() => {
    if (idToken) {
      handleAuthenticate();
    }
  }, [idToken]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-6 p-12 bg-violet-200">
      <div className="text-black font-bold text-3xl mb-8">Template App</div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-8">
        <div className="col-span-2">{/* <TokenTransfer /> */}</div>
        <LoginButton />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Profile />
          </QueryClientProvider>
        </WagmiProvider>
        <GetButton title="Okto Log out" apiFn={handleLogout} />
        <GetButton title="getAccount" apiFn={getAccount} />
        <ProductCard></ProductCard>
      </div>
    </main>
  );
}
