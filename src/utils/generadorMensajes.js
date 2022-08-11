let faker = require('faker');
faker.locale = 'es';

function generarMensjes() {
    return {
        id: faker.internet.email(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad : faker.date.birthdate(),
        alias: faker.internet.userName(),
        avatar: faker.image.avatar()
    }
}

module.exports = { generarMensjes }