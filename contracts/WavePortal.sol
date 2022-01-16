// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    //> Creamos un evento de Solidity
    event NewWave(address indexed from, uint256 timestamp, string message);

    //> Creamos un struct llamado Wave.
    struct Wave {
        address waver; // La dirección del usuario que saludo.
        string message; // El mensaje que el usuario envio.
        uint256 timestamp; // El timestamp de cuando el usuario saludo.
    }

    //> Declaro una variable 'waves' que me permita guardar un array de Wave struct.
    // Esto es lo que me permite almacenar todas las Wave que alguien envia.
    Wave[] waves;

    //> Como nuestro contrato va a recompensar con ETH a otras personas
    // es necesario definirlo como payable.
    constructor() payable {
        console.log("I AM SMART CONTRACT. POG.");
    }

    //> La funcion 'wave' recibe un mensaje como string y lo almacena en la blockchain,
    // ademas recompensa al usuario con ETH que se le envia a su cuenta.
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
        //> Almaceno la info de wave en el array waves.
        waves.push(Wave(msg.sender, _message, block.timestamp));
        //> Emito un evento NewWave para recibirlo desde el FE.
        emit NewWave(msg.sender, block.timestamp, _message);
        //> Monto de ETH que le vamos a enviar a nuestro usuarios.
        uint256 prizeAmount = 0.0001 ether;
        //> Nos aseguramos de que el saldo del contrato sea ​​mayor que el monto del premio.
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        //> Enviamos el ETH al usuario.
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        //> Comprobamos que la transacción sea un éxito.
        require(success, "Failed to withdraw money from contract.");
    }

    //> La funcion 'getAllWaves' que nos devolverá el array de structs, waves.
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    //> La funcion 'getTotalWaves' nos retorna el total de waves.
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
