const carritoMongo = require('../models/carritoMongo');
const contenedorCarrito = require ('../contenedores/contenedorCarrito');
const carrito = new contenedorCarrito;

async function verCarrito(req, res){
    let carrito = await carrito.getAll();
    res.render('product/carrito', {
        carrito:carrito
    });  
}

function agregarAlCarrito(req, res) {
    let productoById = carrito.getById;
    if(productoById != null){
        productoById.push(carritoMongo);
        res.render('carrito/carrito',{ productoById: productoById })
    }else{
        console.log('No se pudo agregar al carrito');
    }
};

module.exports = {
    verCarrito,
    agregarAlCarrito
}