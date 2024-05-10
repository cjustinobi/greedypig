// import { utils } from 'ethers'

export const shortenAddress = (addr: string) => {
  return `${addr?.substring(0, 6)}...${addr?.substring(addr.length - 4)}`
}

export const capitalize = (word: string) =>
  `${word?.substring(0, 1).toUpperCase()}${word?.substring(1)}`



export const generateCommitment = async (address: string) => {
  
  const randomNum = Math.floor(Math.random() * 6) + 1

  const nonce = Math.random() * 1000; // Generate a nonce
  const nonceString = nonce.toString();
  const randomString = randomNum.toString();

  // Store nonce along with commitment
  localStorage.setItem(`nonce${address.toLowerCase()}`, nonceString);
  localStorage.setItem(`move${address.toLowerCase()}`, randomString);

  const encoder = new TextEncoder();
  const data = encoder.encode(randomString + nonceString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  console.log('hashHex ', hashHex)
  return hashHex
};

// export const hasDeposited = (bettingAmount: number, reports: any) => {

//   const hasDeposited = reports && parseInt(utils.formatEther(reports[0].ether)) === bettingAmount

//   return !!hasDeposited
// }