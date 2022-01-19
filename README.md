

<p align="center" width="200">
   <img align="center" width="100" src="https://raw.githubusercontent.com/BraianVaylet/buildspace-wave-portal-ui/main/public/horn.png" />   
   # 🦄 Wave Portal [SmartContract]    
</p>

### Características del proyecto.

- Proyecto desarrollado para los cursos de la plataforma [buildspace](https://buildspace.so/).
- Es un proyecto realizado en Solidity utilizando [HardHat](https://hardhat.org/) como framework.
- Está deployado en la red de Rinkeby.
- La dirección del contrato es: **0xef10AE1B845aEC9251c19cc5af7d4dda7424F52D**, pueden revisar el contrato en el siguiente Link: [rinkeby.etherscan](https://rinkeby.etherscan.io/address/0xef10AE1B845aEC9251c19cc5af7d4dda7424F52D)
- Los usuarios deben conectarse usando MetaMask.
- El contrato permite almacenar un mensaje enviado por un usuario en la blockchain.
- Cuando un usuario deja un mensaje tiene un 50% de probabilidad de ser recompensado con una cantidad de ETH.
- También implementa un sistema anti-bot que impide enviar mensajes continuos, una misma cuenta debe esperar al menos 30 segundos para poder volver a dejar un mensaje.

---

### HARDHAT: Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
