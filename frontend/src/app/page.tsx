"use client";

import { ConnectBtn } from "./components/ConnectButton";
import Profile from "./components/Profile";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import greedyPIgAbi from "./lib/greedyPIgAbi.json"; 

export default function Home() {

  const { address } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();

  const createGame = async () => {

    writeContract({
      address: "0x7dAaA3D13a919FfCEEF2eaE0a8e3A2B59f1865ca",
      abi: greedyPIgAbi.abi,
      functionName: "createGame",
      args: ["Test game", 22, 1],
    });
  }

  console.log(hash)

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      }); 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={createGame}>Create Game</button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ConnectBtn />
      </div>
      <Profile />
    </main>
  );
}
