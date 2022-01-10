# NOTAS sobre HardaHat

## Dudas

### 01. hre.ethers se usa en scripts/run.js pero hre nunca se importa. 🤔?

**Hardhat Runtime Environment**, o **HRE** para abreviar, es un objeto que contiene toda la funcionalidad que Hardhat expone cuando ejecuta una tarea, prueba o script. En realidad, Hardhat es el HRE.

Cada vez que ejecuta un comando de terminal que comienza con npx hardhatusted, obtiene este hreobjeto construido sobre la marcha usando lo hardhat.config.jsespecificado en su código. Esto significa que nunca tendrá que hacer algún tipo de
importación en sus archivos como:

``` javascript
const hre = require("hardhat")
```
