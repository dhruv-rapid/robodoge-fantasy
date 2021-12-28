module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  const token = await deploy("Token", {
    from: deployer,
    args: ["Fantasy Token", "FTS"],
    log: true,
  });

  await deploy("FantasyCrypto", {
    from: deployer,
    args: [deployer, 0, 0, token.address, ZERO_ADDRESS],
    log: true,
  });
};
