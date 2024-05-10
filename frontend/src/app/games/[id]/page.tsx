"use client";

import { wagmiContractConfig } from "@/lib/wagmi";
import greedyPIgAbi from "@/lib/greedyPIgAbi.json";
import { useReadContract } from "wagmi";

const GamesList = ({ params }: { params: { id: number } }) => {

   
  const id = params.id;

  const { data, isPending, error } = useReadContract({
    address: "0x7dAaA3D13a919FfCEEF2eaE0a8e3A2B59f1865ca",
    abi: greedyPIgAbi.abi,
    functionName: "getGame",
    args: [id],
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.shortMessage || error.message}</div>;

  console.log("result ", data);
  return <div>gamesList</div>;
};

export default GamesList;
