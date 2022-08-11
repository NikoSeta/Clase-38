let faker = require('faker');
faker.locale = 'es';

function generarProductos() {
    return {
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        img: faker.image.technics()
    }
}

module.exports = { generarProductos }