// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    //> Nos ayudamos de esto para generar un número aleatorio.
    uint256 private seed;

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

    //> Almaceno la dirección del ultimo usuario que nos envio un mensaje.
    // uso un mapping para asociar una dirección con un número.
    mapping(address => uint256) public lastWavedAt;

    //> Como nuestro contrato va a recompensar con ETH a otras personas
    // es necesario definirlo como payable.
    constructor() payable {
        console.log("I AM SMART CONTRACT. POG.");
        //> Establecemos la semilla inicial.
        // Tomo dos números que me dio Solidity 'block.difficulty' y 'block.timestamplos'
        // los combino para crear un número aleatorio.
        // .
        // block.difficulty: Les dice a los mineros qué tan difícil será extraer el bloque en
        // función de las transacciones en el bloque. Los bloques se vuelven más difíciles por
        // varias razones, pero, principalmente, se vuelven más difíciles cuando hay más transacciones
        // en el bloque (algunos mineros prefieren bloques más fáciles, pero estos pagan menos).
        // .
        // block.timestampes: solo el timestamp de Unix en la que se está procesando el bloque.
        seed = (block.timestamp + block.difficulty) % 100;
    }

    //> La funcion 'wave' recibe un mensaje como string y lo almacena en la blockchain,
    // ademas recompensa al usuario con ETH que se le envia a su cuenta.
    function wave(string memory _message) public {
        //> Impedimos que el usuario envie repetidamente mensajes, sistema anti bots.
        // Nos aseguramos de que el timestamp actual sea al menos 15 minutos más grande que la última que almacenamos
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );
        //> Actualizamos el timestamp actual que tenemos para el usuario
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
        //> Almaceno la info de wave en el array waves.
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Aumentamos la difícil, creo una variable seedque esencialmente cambiará cada vez que
        // un usuario use la funcion 'wave'.
        // Combino estas tres variables para generar una nueva semilla aleatoria.
        // Luego hago lo % 100 que me aseguraré de que el número se reduzca a un rango entre 0 y 100.
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        //> Da un 50% de probabilidad de que el usuario gane la recompenza en ETH.
        if (seed <= 50) {
            console.log("%s won!", msg.sender);
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

        //> Emito un evento NewWave para recibirlo desde el FE.
        emit NewWave(msg.sender, block.timestamp, _message);
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
