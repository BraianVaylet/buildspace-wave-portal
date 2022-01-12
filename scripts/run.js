const main = async () => {
  // > Para implementar algo en la cadena de bloques, ¡necesitamos tener una dirección de billetera! 
  // Hardhat hace esto por nosotros en segundo plano, pero aquí tomé la dirección de la billetera
  // del propietario del contrato y también tomé una dirección de billetera aleatoria y la llamé randomPerson.
  const [owner, randomPerson] = await hre.ethers.getSigners();
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
  // > owner.address direccion de la billetera que implementa nuestro contrato
  console.log("Contract deployed by:", owner.address);
  // > llamo manualmente a nuestras funciones
  let waveCount;
  // > llamo a la función para tomar el numero de waves totales.
  waveCount = await waveContract.getTotalWaves();
  // > llamo a wave() (con mi direccion).
  let waveTxn = await waveContract.wave();
  await waveTxn.wait();
  // > vuelvo a obtener el total de waves para ver si cambio.
  waveCount = await waveContract.getTotalWaves();
  // > llamo a wave() (con otra direccion, la de randomPerson).
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();
  // > vuelvo a obtener el total de waves para ver si cambio.
  waveCount = await waveContract.getTotalWaves();
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