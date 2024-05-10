import greedyPIgAbi from '@/lib/greedyPIgAbi.json'
import { useReadContract, useReadContracts } from 'wagmi'
import { formatUnits } from 'viem'
import GameCard from './GameCard'
import { useState } from 'react'

const GamesList = () => {

  const contracts: any = []
  const [gameId, setGameId] = useState<number>()

  const {
    data: gameIds,
    isPending,
    error
  } = useReadContract({
    address: "0x7dAaA3D13a919FfCEEF2eaE0a8e3A2B59f1865ca",
    abi: greedyPIgAbi.abi,
    functionName: "getGameId",
    args: [],
  });


  if (gameIds) {
    const idCount = formatUnits(gameIds, 0);
    const ids = Array.from({ length: parseInt(idCount) }, (_, index) => index + 1)
   
   
    ids.forEach((i: number) => {
      contracts.push({
        // ...mlootContract,
        address: "0x7dAaA3D13a919FfCEEF2eaE0a8e3A2B59f1865ca",
        abi: greedyPIgAbi.abi,
        functionName: "getGame",
        args: [i],
      });
    });

  }
  const {data: games} = useReadContracts({ contracts });
console.log('rrr ', games)

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.shortMessage || error.message}</div>;

  return (
    <div>
      games list
      {games && games.map((game: any) => <GameCard game={game.result} key={game.result[0]} />)}
    </div>)
};

export default GamesList;
