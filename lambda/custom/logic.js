const constants = require('./constant')

module.exports = {
    getPoesia(nombre) {    
    const factIndex = Math.floor(Math.random() * constants.POEMA.length);
    const randomFact = constants.POEMA[factIndex];
    return randomFact.replace('|nombre|',nombre);   
    } 
}
