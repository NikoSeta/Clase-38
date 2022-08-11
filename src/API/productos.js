const ContenedorMongoDB = require('../contenedores/contenedorMongoDB');
const { generarProductos } = require('../utils/generadorProductos');
const productosModel = require('../models/productosMongo');

class ProductosMock extends ContenedorMongoDB {
    constructor() {
        super(productosModel);
    }
    popular(cant = 5) {
        const newProd = []
        for (let index = 0; index < cant; index++) {
            const nuevosProd = generarProductos(this.update())
            newProd.insert(nuevosProd);
        }
        this.update(nuevosProd);
        return nuevosProd;
    }
};
module.exports = ProductosMock;