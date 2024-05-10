require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config()

const { PRIVATE_KEY } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {

    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/S0QCH1ePWS2pTlRtAsK0JsXQIAaNQB_W',
      chainId: 11155111,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
};
