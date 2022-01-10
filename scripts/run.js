const main = async () => {
  // > Compilamos nuestro contrato y generamos los archivos necesarios 
  // que necesitamos para trabajar con nuestro contrato en  ./artifacts.
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // > Aquí Hardhat creará una red Ethereum local para nosotros y para este contrato.
  // Después de que se complete el script, destruirá esa red local. 
  // Cada vez que ejecute el contrato, será una cadena de bloques nueva. 
  // Esto ayuda a reiniciar el servidor y depurar errores.
  const waveContract = await waveContractFactory.deploy();
  // > Espera a que el contrato se termine de deployar.
  await waveContract.deployed();
  // > waveContract.address nos dará la dirección del contrato desplegado.
  // Esta dirección es cómo podemos encontrar nuestro contrato en la cadena de bloques.
  console.log("Contract deployed to:", waveContract.address);
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