const {
  contracts: { FantasyCrypto, Token },
} = require("./artifacts.json");

const { utils, BigNumber } = ethers;

const fantasyContract = new ethers.Contract(
  FantasyCrypto.address,
  FantasyCrypto.abi,
  ethers.provider
);
const tokenContract = new ethers.Contract(
  Token.address,
  Token.abi,
  ethers.provider
);

const main = async () => {
  console.log("Creating new pool");

  const entryFee = utils.parseEther("1");
  const startTime = Math.round(Date.now() / 1000) + 300;
  const endTime = startTime + 300;

  const signer = await ethers.getSigner();

  const tx = await fantasyContract
    .connect(signer)
    .createPool(
      entryFee.toString(),
      tokenContract.address,
      startTime.toString(),
      endTime.toString()
    );
  await tx.wait();

  const poolId = (await fantasyContract.poolCounter()) - 1;
  console.log(`Pool with ID ${poolId} created`);
};

main().catch((error) => {
  console.log(error.message);
  process.exitCode = 1;
});
