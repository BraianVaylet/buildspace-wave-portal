// run.js nos permite probar la funcionalidad de nuestro contrato antes de deployarlo en la blockchain.

const main = async () => {
  //> Para implementar algo en la cadena de bloques, ¡necesitamos tener una dirección de billetera! 
  // Hardhat hace esto por nosotros en segundo plano, pero aquí tomé la dirección de la billetera
  // del propietario del contrato y también tomé una dirección de billetera aleatoria y la llamé randomPerson.
  const [owner, randomPerson] = await hre.ethers.getSigners();

  //> Compilamos nuestro contrato y generamos los archivos necesarios 
  // que necesitamos para trabajar con nuestro contrato en  ./artifacts.
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  //> Aquí Hardhat creará una red Ethereum local para nosotros y para este contrato.
  // Después de que se complete el script, destruirá esa red local. 
  // Cada vez que ejecute el contrato, será una cadena de bloques nueva. 
  // Esto ayuda a reiniciar el servidor y depurar errores.
  const waveContract = await waveContractFactory.deploy({
    // financio mi contrato con 0.1 ETH
    value: hre.ethers.utils.parseEther("0.1"),
  });
  
  //> Espera a que el contrato se termine de deployar.
  await waveContract.deployed();
  //> waveContract.address nos dará la dirección del contrato desplegado.
  // Esta dirección es cómo podemos encontrar nuestro contrato en la cadena de bloques.
  console.log("Contract deployed to:", waveContract.address);

  //> owner.address direccion de la billetera que implementa nuestro contrato
  console.log("Contract deployed by:", owner.address);

  // Obtengo el balance del contrato
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  //> llamo manualmente a nuestras funciones
  let waveCount;

  //> llamo a la función para tomar el numero de waves totales.
  waveCount = await waveContract.getTotalWaves();

  //> llamo a wave() (con mi direccion).
  let waveTxn = await waveContract.wave("my message 1!");
  await waveTxn.wait();
  //> llamo varias veces con mi direccion, probamos sistema de enfriamiento.
  // waveTxn = await waveContract.wave("my message 2!");
  // await waveTxn.wait();

  // Obtengo nuevamente el balance de mi contrato para ver que sucede.
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  //> vuelvo a obtener el total de waves para ver si cambio.
  waveCount = await waveContract.getTotalWaves();

  //> llamo a wave() (con otra direccion, la de randomPerson).
  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  await waveTxn.wait();
  
  //> vuelvo a obtener el total de waves para ver si cambio.
  waveCount = await waveContract.getTotalWaves();
  
  //> Obtengo el array de waves.
  let allWaves = await waveContract.getAllWaves();
  console.log('allWaves', allWaves);
  
  // Vuelvo a obtener el balance del contrato.
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));
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