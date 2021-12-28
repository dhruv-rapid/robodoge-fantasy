const {
  contracts: { FantasyCrypto, Token },
} = require("./artifacts.json");

const fantasyContract = new ethers.Contract(
  FantasyCrypto.address,
  FantasyCrypto.abi,
  ethers.provider
);

const main = async () => {
  console.log("Setting auth address");

  const authAddress = "0xb1551B2b46df680E8e25E97232888a26ecdc01F5";

  const signer = await ethers.getSigner();
  const tx = await fantasyContract
    .connect(signer)
    .transferOwnership(authAddress);
  await tx.wait();

  console.log("Auth address set succesfully");
};

main().catch((error) => {
  console.log(error.message);
  process.exitCode = 1;
});
