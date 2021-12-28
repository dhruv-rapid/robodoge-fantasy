require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const balance = hre.ethers.utils.formatEther(
      (await account.getBalance()).toString()
    );
    console.log(`${account.address} (${balance} ETH)`);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "bsc_testnet",

  networks: {
    bsc_testnet: {
      url: process.env.BSC_RPC_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 10,
      },
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  },

  etherscan: {
    apiKey: "Q71NDEW5C1RHDNNWS4YXIHE6KVWDWXTSMB",
  },

  solidity: "0.8.3",
};
