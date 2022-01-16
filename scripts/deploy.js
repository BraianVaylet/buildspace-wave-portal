const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    //> Financio el contrato.
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await waveContract.deployed();

  console.log("WavePortal address: ", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

// > Desplegamos nuestro contrato con: npx hardhat run scripts/deploy.js --network localhost

// Historial:
// 1.Deploy: 0x84dC25d181313BA7BF65A23155E15CBb5214f5a1 (test)
// 2.Deploy: 0x4A04696010DE8C6007d14846e06FddE76C73c290 (se agrego la posibilidad de recibir un mensaje)
// 3.Deploy: 0xEF0d6ab3487C1f463dD90E3AffBd577494EeA644 (se financio el contrato, se recompensa con ETH a los usuarios)