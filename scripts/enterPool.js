const {
  contracts: { FantasyCrypto, Token },
} = require("./artifacts.json");

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
  const { utils } = ethers;
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  const poolId = 0;
  const count = 10;

  const signers = await ethers.getSigners();

  for (let i = 0; i < count; i++) {
    console.log(`User ${i + 1} entering pool ${poolId}`);

    const amount = utils.parseEther("10000");
    const transferTx = await tokenContract
      .connect(signers[0])
      .transfer(signers[i].address, amount);
    await transferTx.wait();

    // if (
    //   (await tokenContract.allowance(
    //     signers[i].address,
    //     fantasyContract.address
    //   )) === 0
    // ) {
    const approveTx = await tokenContract
      .connect(signers[i])
      .approve(fantasyContract.address, "100000000000000000000000000000000000");
    await approveTx.wait();
    // }

    const tx = await fantasyContract
      .connect(signers[i])
      .enterPool(poolId, [
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      ]);
    await tx.wait();

    console.log(`User ${i + 1} entered succesfully\n`);
  }
};

main().catch((error) => {
  console.log(error.message);
  process.exitCode = 1;
});
