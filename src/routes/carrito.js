const express = require('express');
const { Router } = express;
const carrito = require('../controllers/carrito');
const routerCart = Router();

// CARRITO
routerCart.get('/', carrito.verCarrito);
routerCart.post('/cart:id', carrito.agregarAlCarrito);
routerCart.put('/prod-cart:productId')
routerCart.delete('/prod-cart:productId')


module.exports = routerCart;