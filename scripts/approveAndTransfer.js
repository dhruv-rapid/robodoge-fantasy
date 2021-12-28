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

  const count = 10;

  const signers = await ethers.getSigners();

  for (let i = 0; i < count; i++) {
    const amount = utils.parseEther("1000000");
    const transferTx = await tokenContract
      .connect(signers[0])
      .transfer(signers[i].address, amount);
    await transferTx.wait();

    const approveTx = await tokenContract
      .connect(signers[i])
      .approve(fantasyContract.address, "100000000000000000000000000000000000");
    await approveTx.wait();

    console.log(`User ${i + 1} done`);
  }
};

main().catch((error) => {
  console.log(error.message);
  process.exitCode = 1;
});
